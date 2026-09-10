const DEFAULT_APP_NAME = "mergelens-pr";

export function getGithubInstallUrl(userId: string): string {
  const appName = process.env.NEXT_PUBLIC_GITHUB_APP_NAME || DEFAULT_APP_NAME;
  const url = new URL(`https://github.com/apps/${appName}/installations/new`);
  url.searchParams.set("state", userId);
  return url.toString();
}
