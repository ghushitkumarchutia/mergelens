import type { PullRequestWebhookPayload } from "@/features/github/server/webhook-handler";
import { prisma } from "@/lib/db";

function getAuthorLogin(
  user: { login: string } | null | undefined,
): string | null {
  if (!user?.login) {
    return null;
  }
  return user.login.trim();
}

export async function savePullRequest(payload: PullRequestWebhookPayload) {
  if (
    !payload?.repository?.full_name ||
    !payload?.pull_request?.number ||
    !payload?.installation?.id
  ) {
    throw new Error(
      "Invalid pull request webhook payload: missing required fields",
    );
  }

  const repoFullName = payload.repository.full_name.trim();
  const prNumber = payload.pull_request.number;
  const title = payload.pull_request.title?.trim() || "Untitled Pull Request";
  const authorLogin = getAuthorLogin(payload.pull_request.user);
  const headSha = payload.pull_request.head?.sha?.trim() || "";
  const baseBranch = payload.pull_request.base?.ref?.trim() || "main";
  const installationId = payload.installation.id;

  return prisma.pullRequest.upsert({
    where: {
      repoFullName_prNumber: { repoFullName, prNumber },
    },
    create: {
      installationId,
      repoFullName,
      prNumber,
      title,
      authorLogin,
      headSha,
      baseBranch,
      status: "pending",
    },
    update: {
      installationId,
      title,
      authorLogin,
      headSha,
      baseBranch,
      status: "pending",
    },
  });
}
