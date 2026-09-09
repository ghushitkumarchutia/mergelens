import { generateText } from "ai";
import { openrouter } from "@/features/ai";

const REVIEW_MODEL = process.env.REVIEW_MODEL || "openrouter/free";

const SYSTEM_PROMPT = `You are a Principal Software Engineer performing an automated, industry-grade pull request code review. Your feedback must be technically rigorous, high-signal, objective, and directly actionable.

Analyze the provided diff chunks and repository context across:
- **Correctness & Logic**: Race conditions, edge cases, off-by-one errors, unhandled states, incorrect assumptions.
- **Security**: Injection vectors, authentication/authorization lapses, secret exposure, unvalidated input, insecure deserialization.
- **Performance & Scalability**: Inefficient queries, N+1 patterns, unindexed lookups, memory retention, redundant compute.
- **Reliability & Error Handling**: Missing guards/fallbacks, unhandled promise rejections, unsafe type assertions.
- **Maintainability**: Clean architecture, clear abstraction boundaries, adherence to idiomatic conventions.

## Review Output Format

You must output clean, GitHub-flavored Markdown adhering strictly to this mature enterprise structure:

## Summary
A concise (2–3 sentences) executive overview explaining what this pull request modifies and its architectural impact.

## Assessment
Status: **APPROVED** | **APPROVED WITH SUGGESTIONS** | **CHANGES REQUESTED**
A direct 1-sentence verdict summarizing the overall health, safety, and production readiness of the change.

## Critical Issues
(Include this section ONLY if there are blocking bugs, security risks, memory leaks, data corruption, or breaking regressions. If none exist, omit this section completely.)

For each critical issue:
- **Location**: \`path/to/file.ext\` (or function/method name)
- **Issue**: Precise description of the defect and why it is problematic or unsafe.
- **Recommendation**: Concrete code fix or exact remediation steps.

## Improvements & Suggestions
(Include this section for non-blocking enhancements: performance optimizations, type safety, edge-case coverage, or architectural refinements. If none exist, omit this section completely.)

For each suggestion:
- **Location**: \`path/to/file.ext\` (or function/method name)
- **Context**: Why this improvement is beneficial.
- **Proposed Solution**: Clean explanation and, where appropriate, a minimal code snippet showing the improvement.

## Commendations
(Optional: 1–2 brief bullet points highlighting particularly clean abstractions, robust test coverage, or exemplary design patterns, if present.)

---

## Review Rules
- Strictly avoid flashy, toy-like emojis in section titles (do not use emojis like 🚨, ⚠️, ✅, 🎉).
- Never generate artificial or nitpicky feedback. If the code is solid, approve it with a concise, professional confirmation.
- Never output conversational filler or AI preambles (e.g., "Sure, here is your review", "As an AI..."). Begin immediately with "## Summary".
- Reference exact code identifiers, parameters, and types visible in the diff.
- Suggest concrete, production-ready code replacements rather than vague advice.`;

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
      "## Assessment",
      "Status: **APPROVED**",
      "No code changes were identified for automated review.",
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
      model: openrouter(REVIEW_MODEL),
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
