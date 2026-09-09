import { inngest } from "@/features/inngest/client";
import { prisma } from "@/lib/db";
import { getPullRequestFiles } from "./pr-files";
import { generateReview } from "./generate-review";
import { postPrComment } from "./post-pr-comment";
import { chunkPrFiles } from "../utils/chunk-code";
import {
  buildPrNamespace,
  saveChunksToPinecone,
  searchPrContext,
} from "./vector";
import { buildRepoNamespace } from "@/features/repo-sync/server/repo-sync";

export const reviewPullRequest = inngest.createFunction(
  {
    id: "review-pull-request",
    triggers: { event: "github/pr.received" },
    onFailure: async ({ event }) => {
      const pullRequestId = event.data.event.data?.pullRequestId;
      if (!pullRequestId) {
        return;
      }

      await prisma.pullRequest.updateMany({
        where: { id: pullRequestId },
        data: { status: "failed" },
      });
    },
  },
  async ({ event, step }) => {
    const pullRequestId = event.data?.pullRequestId;
    if (!pullRequestId) {
      throw new Error("Missing required pullRequestId in event payload");
    }

    const pullRequest = await step.run("mark-processing", async () => {
      return prisma.pullRequest.update({
        where: { id: pullRequestId },
        data: { status: "processing" },
      });
    });

    if (!pullRequest) {
      return {
        pullRequestId,
        status: "skipped",
        reason: "pull request not found",
      };
    }

    const chunks = await step.run("breakdown-code", async () => {
      const files = await getPullRequestFiles(
        pullRequest.installationId,
        pullRequest.repoFullName,
        pullRequest.prNumber,
      );

      return chunkPrFiles(pullRequest.prNumber, files);
    });

    if (chunks.length === 0) {
      await step.run("mark-reviewed-no-code", async () => {
        await prisma.pullRequest.update({
          where: { id: pullRequestId },
          data: {
            status: "reviewed",
            reviewComment:
              "No reviewable code changes detected in this pull request.",
            reviewedAt: new Date(),
          },
        });
      });

      return { pullRequestId, status: "reviewed", reason: "no code to review" };
    }

    const namespace = buildPrNamespace(
      pullRequest.repoFullName,
      pullRequest.prNumber,
    );

    await step.run("save-vectors-to-pinecone", async () => {
      await saveChunksToPinecone(namespace, chunks);
    });

    await step.sleep("wait-for-vectors-to-index", "10s");

    const repoContextSnippets = await step.run(
      "search-repo-context",
      async () => {
        const repoSync = await prisma.repoSync.findUnique({
          where: { repoFullName: pullRequest.repoFullName },
        });

        if (!repoSync || repoSync.status !== "synced") {
          return [];
        }

        const repoNamespace = buildRepoNamespace(pullRequest.repoFullName);
        return searchPrContext(repoNamespace, pullRequest.title);
      },
    );

    const review = await step.run("generate-ai-review", async () => {
      const contextSnippets = await searchPrContext(
        namespace,
        pullRequest.title,
      );

      return generateReview({
        repoFullName: pullRequest.repoFullName,
        title: pullRequest.title,
        contextSnippets,
        repoContextSnippets,
      });
    });

    await step.run("post-pr-comment", async () => {
      const commentBody =
        review?.trim() ||
        "### MergeLens AI Review\n\nNo significant issues or suggestions identified.";

      await postPrComment(
        pullRequest.installationId,
        pullRequest.repoFullName,
        pullRequest.prNumber,
        commentBody,
      );
    });

    await step.run("mark-reviewed", async () => {
      await prisma.pullRequest.update({
        where: { id: pullRequestId },
        data: {
          status: "reviewed",
          reviewComment: review,
          reviewedAt: new Date(),
        },
      });
    });

    return { pullRequestId, status: "reviewed" };
  },
);
