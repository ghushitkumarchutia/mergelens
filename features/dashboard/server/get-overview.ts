import { prisma } from "@/lib/db";
import {
  getUserInstallationId,
  getInstallationStatus,
} from "@/features/github/server/installation";
import { getUserSubscription } from "@/features/billing/server/subscription";
import { getReviewsThisMonth } from "@/features/billing/server/usage";

export type OverviewStats = {
  reposSynced: number;
  totalPrsReviewed: number;
  reviewsThisMonth: number;
  plan: string;
  githubConnected: boolean;
  githubAccount: string | null;
};

export async function getDashboardOverview(
  userId: string,
): Promise<OverviewStats> {
  const [installationId, subscription, installationStatus] = await Promise.all([
    getUserInstallationId(userId),
    getUserSubscription(userId),
    getInstallationStatus(userId),
  ]);

  let reposSynced = 0;
  let totalPrsReviewed = 0;
  let reviewsThisMonth = 0;

  if (installationId) {
    [reposSynced, totalPrsReviewed, reviewsThisMonth] = await Promise.all([
      prisma.repoSync.count({
        where: { installationId, status: "synced" },
      }),
      prisma.pullRequest.count({
        where: { installationId, status: "reviewed" },
      }),
      getReviewsThisMonth(userId),
    ]);
  }

  return {
    reposSynced,
    totalPrsReviewed,
    reviewsThisMonth,
    plan: subscription.plan === "pro" ? "Pro" : "Free",
    githubConnected: installationStatus.connected,
    githubAccount: installationStatus.accountLogin,
  };
}
