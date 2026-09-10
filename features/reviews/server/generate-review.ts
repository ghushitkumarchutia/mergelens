import { generateText } from "ai";
import { getOpenRouter } from "@/features/ai";

const REVIEW_MODEL = process.env.REVIEW_MODEL || "openrouter/free";

const SYSTEM_PROMPT = `You are a Staff Software Engineer conducting an automated pull request review. Produce technically precise, high-signal feedback that a senior engineer would trust without second-guessing.

Analyze the diff and available repository context for defects across correctness, security, performance, reliability, and maintainability. Do not speculate beyond what the diff shows. If the code is sound, say so briefly and approve.

Output clean GitHub-flavored Markdown in exactly this structure. Omit any section that has no content — never output an empty section.

---

## Summary

2–3 sentences: what this PR changes and why it matters architecturally. Reference concrete modules, functions, or data flows — not vague descriptions.

## Verdict

One of: **Approved** · **Approved with Suggestions** · **Changes Requested**

One sentence explaining the decision.

## Findings

A numbered list. Each finding follows this template:

1. **[severity]** \`path/to/file.ext\` — \`functionOrSymbol\`

   _What:_ Precise description of the defect or concern.

   _Why it matters:_ Impact on correctness, security, performance, or reliability.

   _Fix:_ Concrete remediation. Include a minimal code snippet when it clarifies the fix.

Severity labels (use exactly one per finding):
- **critical** — Blocking: bugs, security vulnerabilities, data corruption, breaking regressions.
- **warning** — Non-blocking but significant: race conditions, missing edge-case handling, fragile assumptions.
- **suggestion** — Improvement opportunity: performance, readability, type safety, idiomatic patterns.
- **nitpick** — Minor style or naming preference. Use sparingly.

If there are no findings, write: "No issues identified."

## Notes

Optional. 1–2 bullet points for context that doesn't fit a finding: migration considerations, follow-up work worth tracking, or a brief note on particularly well-structured code.

---

Constraints:
- Begin output with \`## Summary\`. No preamble, no conversational text, no sign-off.
- Do not use decorative emojis in headings or severity labels.
- Reference exact identifiers, types, and parameter names visible in the diff.
- Provide production-ready code fixes, not vague advice.
- Never fabricate issues. If the code is clean, approve it concisely.`;

export type ReviewInput = {
  repoFullName: string;
  title: string;
  contextSnippets: string[];
  repoContextSnippets: string[];
};

function buildRepoContextSection(repoContextSnippets: string[]): string {
  const validSnippets = repoContextSnippets
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  if (validSnippets.length === 0) {
    return "";
  }

  const repoContext = validSnippets.join("\n\n---\n\n");

  return `\n\n### Repository Context (Reference Only)\n${repoContext}`;
}

export async function generateReview(input: ReviewInput): Promise<string> {
  const validDiffSnippets = (input.contextSnippets || [])
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  if (validDiffSnippets.length === 0) {
    return [
      "## Summary",
      `Pull request "${input.title || "Untitled"}" in \`${input.repoFullName}\` contains no inspectable code diffs.`,
      "",
      "## Verdict",
      "**Approved**",
      "",
      "No code changes were identified for review.",
    ].join("\n");
  }

  const context = validDiffSnippets.join("\n\n---\n\n");
  const repoContextSection = buildRepoContextSection(
    input.repoContextSnippets || [],
  );

  const prompt = [
    `Repository: ${input.repoFullName}`,
    `Pull Request Title: ${input.title}`,
    "",
    "### Pull Request Diff",
    context,
    repoContextSection,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const { text } = await generateText({
      model: getOpenRouter()(REVIEW_MODEL),
      system: SYSTEM_PROMPT,
      prompt,
      temperature: 0.1,
    });

    return text.trim();
  } catch (error) {
    console.error(
      `[generateReview] Failed to generate review for "${input.repoFullName}" PR "${input.title}":`,
      error,
    );
    throw error;
  }
}
