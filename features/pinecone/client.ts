import { Pinecone } from "@pinecone-database/pinecone";

let pinecone: Pinecone | null = null;

export function getPineconeIndex() {
  if (!pinecone) {
    const apiKey = process.env.PINECONE_API_KEY;
    if (!apiKey) {
      throw new Error(
        "Missing PINECONE_API_KEY. Ensure it is defined in environment variables.",
      );
    }
    pinecone = new Pinecone({ apiKey });
  }

  const indexName = process.env.PINECONE_INDEX;
  if (!indexName) {
    throw new Error(
      "Missing PINECONE_INDEX. Ensure it is defined in environment variables.",
    );
  }

  return pinecone.index({ name: indexName });
}
