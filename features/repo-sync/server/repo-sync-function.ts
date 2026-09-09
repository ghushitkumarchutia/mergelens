import { inngest } from "@/features/inngest/client";
import { prisma } from "@/lib/db";
import {
  buildRepoNamespace,
  chunkRepoFiles,
  deleteRepoNamespace,
  getRepoFiles,
  saveRepoChunks,
} from "@/features/repo-sync/server/repo-sync";

export const syncRepoCodebaseFunction = inngest.createFunction(
  {
    id: "sync-repo-codebase",
    triggers: { event: "repo/sync.requested" },
    onFailure: async ({ event }) => {
      const repoSyncId = event.data.event.data?.repoSyncId;
      if (!repoSyncId) {
        return;
      }

      await prisma.repoSync.updateMany({
        where: { id: repoSyncId },
        data: { status: "failed" },
      });
    },
  },

  async ({ event, step }) => {
    const repoSyncId = event.data?.repoSyncId;
    if (!repoSyncId) {
      throw new Error("Missing required repoSyncId in event payload");
    }

    const repoSync = await step.run("mark-syncing", async () => {
      return prisma.repoSync.update({
        where: { id: repoSyncId },
        data: { status: "syncing" },
      });
    });

    const chunks = await step.run("fetch-and-chunk-codebase", async () => {
      const files = await getRepoFiles(
        repoSync.installationId,
        repoSync.repoFullName,
        repoSync.branch,
      );

      return chunkRepoFiles(files);
    });

    const namespace = buildRepoNamespace(repoSync.repoFullName);

    if (repoSync.syncedAt) {
      await step.run("delete-old-vectors", async () => {
        await deleteRepoNamespace(namespace);
      });
    }

    await step.run("save-vectors-to-pinecone", async () => {
      await saveRepoChunks(namespace, chunks);
    });

    await step.run("mark-synced", async () => {
      await prisma.repoSync.update({
        where: { id: repoSyncId },
        data: {
          status: "synced",
          syncedAt: new Date(),
          chunkCount: chunks.length,
        },
      });
    });

    return {
      repoSyncId,
      status: "synced",
      chunkCount: chunks.length,
    };
  },
);
