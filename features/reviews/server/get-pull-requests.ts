import { cache } from "react";
import { prisma } from "@/lib/db";
import { getUserInstallationId } from "@/features/github/server/installation";

export type PullRequestStatus =
  | "pending"
  | "processing"
  | "reviewed"
  | "rate_limited";

export type DashboardPullRequest = {
  id: string;
  repoFullName: string;
  prNumber: number;
  title: string;
  authorLogin: string | null;
  status: string;
  reviewedAt: string | null;
  createdAt: string;
  reviewComment?: string | null;
};

const DEFAULT_LIMIT = 100;

export const getUserPullRequests = cache(async function getUserPullRequests(
  userId: string,
  statusFilter?: string,
  limit = DEFAULT_LIMIT,
  repoFullName?: string,
): Promise<DashboardPullRequest[]> {
  if (!userId || typeof userId !== "string" || userId.trim() === "") {
    return [];
  }

  const installationId = await getUserInstallationId(userId);

  if (!installationId || installationId <= 0) {
    return [];
  }

  const cleanFilter = statusFilter?.trim().toLowerCase();
  const safeLimit = Number.isFinite(limit)
    ? Math.min(100, Math.max(1, Math.floor(limit)))
    : DEFAULT_LIMIT;

  const where: {
    installationId: number;
    status?: string;
    repoFullName?: string;
  } = {
    installationId,
  };

  if (cleanFilter && cleanFilter !== "all") {
    where.status = cleanFilter;
  }

  if (
    repoFullName &&
    typeof repoFullName === "string" &&
    repoFullName.trim() !== ""
  ) {
    where.repoFullName = repoFullName.trim();
  }

  try {
    const pullRequests = await prisma.pullRequest.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: safeLimit,
      select: {
        id: true,
        repoFullName: true,
        prNumber: true,
        title: true,
        authorLogin: true,
        status: true,
        reviewedAt: true,
        createdAt: true,
      },
    });

    return pullRequests.map((pr) => ({
      id: pr.id,
      repoFullName: pr.repoFullName,
      prNumber: pr.prNumber,
      title: pr.title,
      authorLogin: pr.authorLogin,
      status: pr.status,
      reviewedAt: pr.reviewedAt ? pr.reviewedAt.toISOString() : null,
      createdAt: pr.createdAt.toISOString(),
    }));
  } catch (error) {
    console.error(
      `[getUserPullRequests] Failed to query pull requests for user "${userId}":`,
      error,
    );
    return [];
  }
});

export const getPullRequestById = cache(async function getPullRequestById(
  userId: string,
  pullRequestId: string,
): Promise<DashboardPullRequest | null> {
  if (
    !userId ||
    typeof userId !== "string" ||
    !pullRequestId ||
    typeof pullRequestId !== "string"
  ) {
    return null;
  }

  const installationId = await getUserInstallationId(userId);

  if (!installationId || installationId <= 0) {
    return null;
  }

  try {
    const pr = await prisma.pullRequest.findFirst({
      where: {
        id: pullRequestId.trim(),
        installationId,
      },
      select: {
        id: true,
        repoFullName: true,
        prNumber: true,
        title: true,
        authorLogin: true,
        status: true,
        reviewedAt: true,
        createdAt: true,
        reviewComment: true,
      },
    });

    if (!pr) {
      return null;
    }

    return {
      id: pr.id,
      repoFullName: pr.repoFullName,
      prNumber: pr.prNumber,
      title: pr.title,
      authorLogin: pr.authorLogin,
      status: pr.status,
      reviewedAt: pr.reviewedAt ? pr.reviewedAt.toISOString() : null,
      createdAt: pr.createdAt.toISOString(),
      reviewComment: pr.reviewComment,
    };
  } catch (error) {
    console.error(
      `[getPullRequestById] Failed to query pull request "${pullRequestId}" for user "${userId}":`,
      error,
    );
    return null;
  }
});
