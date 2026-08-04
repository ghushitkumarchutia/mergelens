"use server";

import { redirect } from "next/navigation";
import { getServerSession } from "../../auth/actions";
import { getUserInstallationId } from "../../github/server/installation";
import { DASHBOARD_ROUTES } from "../../dashboard/lib/routes";
import { triggerRepoSync } from "../server/repo-sync";

const REPO_FULL_NAME_PATTERN = /^[a-zA-Z0-9._-]+\/[a-zA-Z0-9._-]+$/;

const BRANCH_PATTERN = /^[^\s\x00-\x1f]+$/;

export async function syncRepoCodebase(repoFullName: string, branch: string) {
  if (!REPO_FULL_NAME_PATTERN.test(repoFullName)) {
    throw new Error("Invalid repository name. Expected format: owner/repo");
  }

  if (!branch || !BRANCH_PATTERN.test(branch)) {
    throw new Error("Invalid branch name.");
  }

  const session = await getServerSession();

  if (!session) {
    redirect("/sign-in");
  }

  const installationId = await getUserInstallationId(session.user.id);

  if (!installationId) {
    redirect(DASHBOARD_ROUTES.github);
  }

  await triggerRepoSync(installationId, repoFullName, branch);
}
