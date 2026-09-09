import { getGithubApp } from "@/features/github/utils/github-app";
import type { PrFile } from "../types/review";

const FILES_PER_PAGE = 100;

export function formatPrFilesForReview(files: PrFile[]): string {
  if (!Array.isArray(files) || files.length === 0) {
    return "";
  }

  return files
    .filter((file) => file?.filePath && file?.patch)
    .map(
      (file) =>
        `### ${file.filePath.trim()}\n\`\`\`diff\n${file.patch.trim()}\n\`\`\``,
    )
    .join("\n\n");
}

export async function getPullRequestFiles(
  installationId: number,
  repoFullName: string,
  prNumber: number,
): Promise<PrFile[]> {
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

  const app = getGithubApp();
  const octokit = await app.getInstallationOctokit(installationId);

  const { data } = await octokit.request(
    "GET /repos/{owner}/{repo}/pulls/{pull_number}/files",
    {
      owner,
      repo,
      pull_number: Math.floor(prNumber),
      per_page: FILES_PER_PAGE,
    },
  );

  if (!Array.isArray(data) || data.length === 0) {
    return [];
  }

  const files: PrFile[] = [];

  for (const file of data) {
    if (!file?.patch || !file?.filename) {
      continue;
    }

    files.push({
      filePath: file.filename.trim(),
      patch: file.patch,
    });
  }

  return files;
}
