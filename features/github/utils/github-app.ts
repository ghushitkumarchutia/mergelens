import { App } from "octokit";

let githubApp: App | null = null;

export function getGithubApp(): App {
  if (!githubApp) {
    const appId = process.env.GITHUB_APP_ID;
    const privateKey = process.env.GITHUB_APP_PRIVATE_KEY;
    const webhookSecret = process.env.GITHUB_WEBHOOK_SECRET;

    if (!appId || !privateKey || !webhookSecret) {
      throw new Error(
        "Missing required GitHub App configuration. Ensure GITHUB_APP_ID, GITHUB_APP_PRIVATE_KEY, and GITHUB_WEBHOOK_SECRET are defined.",
      );
    }

    githubApp = new App({
      appId,
      privateKey: privateKey.replace(/\\n/g, "\n"),
      webhooks: {
        secret: webhookSecret,
      },
    });
  }

  return githubApp;
}
