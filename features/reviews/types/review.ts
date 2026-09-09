export type PrFile = {
  filePath: string;
  patch: string;
};

export type CodeChunk = {
  id: string;
  filePath: string;
  text: string;
};

export type ReviewContextSnippet = {
  filePath: string;
  text: string;
};
