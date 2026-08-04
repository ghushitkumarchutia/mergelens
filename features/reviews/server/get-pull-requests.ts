import { prisma } from "@/lib/db";
import { getUserInstallationId } from "@/features/github/server/installation";

export type DashboardPullRequest = {
  id: string;
  repoFullName: string;
  prNumber: number;
  title: string;
  authorLogin: string | null;
  status: string;
  reviewedAt: string | null;
  createdAt: string;
};

export async function getUserPullRequests(
  userId: string,
  statusFilter?: string,
): Promise<DashboardPullRequest[]> {
  const installationId = await getUserInstallationId(userId);

  if (!installationId) {
    return [];
  }

  const where: { installationId: number; status?: string } = {
    installationId,
  };

  if (statusFilter && statusFilter !== "all") {
    where.status = statusFilter;
  }

  const pullRequests = await prisma.pullRequest.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 100,
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
    ...pr,
    reviewedAt: pr.reviewedAt?.toISOString() ?? null,
    createdAt: pr.createdAt.toISOString(),
  }));
}
