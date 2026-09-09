"use server";

import { getServerSession } from "../../auth/actions";
import { getUserInstallationId } from "../../github/server/installation";
import { triggerRepoSync } from "../server/repo-sync";

const REPO_FULL_NAME_PATTERN = /^[a-zA-Z0-9._-]+\/[a-zA-Z0-9._-]+$/;

const BRANCH_PATTERN = /^[^\s\x00-\x1f]+$/;

export type SyncResult = {
  success: boolean;
  error?: string;
};

export async function syncRepoCodebase(
  repoFullName: string,
  branch: string,
): Promise<SyncResult> {
  const cleanRepo = repoFullName?.trim() ?? "";
  const cleanBranch = branch?.trim() ?? "";

  if (!REPO_FULL_NAME_PATTERN.test(cleanRepo)) {
    return { success: false, error: "Invalid repository name." };
  }

  if (!cleanBranch || !BRANCH_PATTERN.test(cleanBranch)) {
    return { success: false, error: "Invalid branch name." };
  }

  const session = await getServerSession();

  if (!session) {
    return { success: false, error: "Unauthorized. Please sign in." };
  }

  const installationId = await getUserInstallationId(session.user.id);

  if (!installationId) {
    return {
      success: false,
      error: "GitHub App not connected. Please connect your GitHub account.",
    };
  }

  try {
    await triggerRepoSync(installationId, cleanRepo, cleanBranch);
    return { success: true };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "An unexpected error occurred.";
    return { success: false, error: message };
  }
}
