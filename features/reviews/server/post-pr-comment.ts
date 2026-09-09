import { getGithubApp } from "@/features/github/utils/github-app";

export type PostedCommentResult = {
  id: number;
  url: string;
};

export async function postPrComment(
  installationId: number,
  repoFullName: string,
  prNumber: number,
  body: string,
): Promise<PostedCommentResult> {
  if (!installationId || !Number.isFinite(installationId)) {
    throw new Error(`Invalid installation id: "${installationId}"`);
  }

  const [owner, repo] = repoFullName?.trim().split("/") ?? [];
  if (!owner || !repo) {
    throw new Error(`Invalid repo full name: "${repoFullName}"`);
  }

  if (!prNumber || !Number.isFinite(prNumber) || prNumber <= 0) {
    throw new Error(`Invalid pull request number: "${prNumber}"`);
  }

  const safeBody = body?.trim();
  if (!safeBody) {
    throw new Error("Pull request comment body cannot be empty");
  }

  const app = getGithubApp();
  const octokit = await app.getInstallationOctokit(installationId);

  const { data } = await octokit.request(
    "POST /repos/{owner}/{repo}/issues/{issue_number}/comments",
    {
      owner,
      repo,
      issue_number: Math.floor(prNumber),
      body: safeBody,
    },
  );

  return {
    id: Number(data.id),
    url: data.html_url,
  };
}
