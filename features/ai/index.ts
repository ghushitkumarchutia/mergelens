import { createOpenRouter } from "@openrouter/ai-sdk-provider";

let instance: ReturnType<typeof createOpenRouter> | null = null;

export function getOpenRouter() {
  if (!instance) {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      throw new Error(
        "Missing OPENROUTER_API_KEY. Ensure it is defined in environment variables.",
      );
    }
    instance = createOpenRouter({ apiKey });
  }
  return instance;
}
