import { inngest } from "@/features/inngest/client";
import { reviewPullRequest } from "@/features/reviews/server/review-pr-function";
import { serve } from "inngest/next";
import { syncRepoCodebaseFunction } from "@/features/repo-sync/server/repo-sync-function";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [reviewPullRequest, syncRepoCodebaseFunction],
});
