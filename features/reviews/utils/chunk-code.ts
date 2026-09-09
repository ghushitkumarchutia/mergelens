import type { CodeChunk, PrFile } from "@/features/reviews/types/review";

export const MAX_CHUNK_LINES = 80;

function buildChunkId(
  prNumber: number,
  filePath: string,
  part: number,
): string {
  return `pr-${prNumber}--${filePath}--part-${part}`;
}

export function chunkPrFiles(prNumber: number, files: PrFile[]): CodeChunk[] {
  if (!Array.isArray(files) || files.length === 0) {
    return [];
  }

  const safePrNumber =
    Number.isFinite(prNumber) && prNumber > 0 ? Math.floor(prNumber) : 0;
  const chunks: CodeChunk[] = [];

  for (const file of files) {
    if (
      !file ||
      typeof file.filePath !== "string" ||
      typeof file.patch !== "string"
    ) {
      continue;
    }

    if (!file.patch.trim()) {
      continue;
    }

    const lines = file.patch.split("\n");

    for (let start = 0; start < lines.length; start += MAX_CHUNK_LINES) {
      const part = Math.floor(start / MAX_CHUNK_LINES);
      const text = lines.slice(start, start + MAX_CHUNK_LINES).join("\n");

      if (!text.trim()) {
        continue;
      }

      chunks.push({
        id: buildChunkId(safePrNumber, file.filePath, part),
        filePath: file.filePath,
        text,
      });
    }
  }

  return chunks;
}
