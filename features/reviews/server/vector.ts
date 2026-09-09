import type { CodeChunk } from "@/features/reviews/types/review";
import { getPineconeIndex } from "@/features/pinecone/client";

const CONTEXT_RESULTS = 10;
const UPSERT_BATCH_SIZE = 90;

export function buildPrNamespace(
  repoFullName: string,
  prNumber: number,
): string {
  const safeName = repoFullName.trim().replaceAll("/", "--");
  const safePrNumber =
    Number.isFinite(prNumber) && prNumber > 0 ? Math.floor(prNumber) : 0;
  return `${safeName}--pr-${safePrNumber}`;
}

export async function saveChunksToPinecone(
  namespace: string,
  chunks: CodeChunk[],
): Promise<void> {
  if (!namespace || !Array.isArray(chunks) || chunks.length === 0) {
    return;
  }

  const index = getPineconeIndex();

  for (let start = 0; start < chunks.length; start += UPSERT_BATCH_SIZE) {
    const batch = chunks.slice(start, start + UPSERT_BATCH_SIZE);

    const records = batch
      .filter((chunk) => chunk?.id && chunk?.text && chunk.text.trim())
      .map((chunk) => ({
        id: chunk.id,
        text: chunk.text,
        filePath: chunk.filePath || "unknown",
      }));

    if (records.length === 0) {
      continue;
    }

    await index.namespace(namespace).upsertRecords({ records });
  }
}

export async function searchPrContext(
  namespace: string,
  query: string,
): Promise<string[]> {
  const safeQuery = query?.trim();

  if (!namespace || !safeQuery) {
    return [];
  }

  try {
    const index = getPineconeIndex();

    const response = await index.namespace(namespace).searchRecords({
      query: { topK: CONTEXT_RESULTS, inputs: { text: safeQuery } },
    });

    const hits = response?.result?.hits ?? [];
    const snippets: string[] = [];

    for (const hit of hits) {
      const fields = hit?.fields as
        | { text?: string; filePath?: string }
        | undefined;
      if (!fields?.text || !fields.text.trim()) {
        continue;
      }

      const path = fields.filePath ? fields.filePath : "unknown";
      snippets.push(`File: ${path}\n${fields.text}`);
    }

    return snippets;
  } catch (error) {
    console.warn(
      `[Pinecone] searchPrContext failed for namespace "${namespace}":`,
      error,
    );
    return [];
  }
}
