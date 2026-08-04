import type { RepoSyncStatus } from "@/features/repo-sync/types";

export type { RepoSyncStatus };

export type RepoVisibility = "public" | "private";

export type DashboardRepo = {
  id: string;
  name: string;
  fullName: string;
  visibility: RepoVisibility;
  defaultBranch: string;
  updatedAt: string;
  language: string | null;
  stars: number;
  syncStatus?: RepoSyncStatus | null;
};

export type GithubInstallationStatus = {
  connected: boolean;
  accountLogin: string | null;
  installedAt: string | null;
};

export type SubscriptionPlan = "free" | "pro";

export type UserSubscription = {
  plan: SubscriptionPlan;
  status: "active" | "canceled" | "trialing" | "halted" | "pending";
  renewsAt: string | null;
};
