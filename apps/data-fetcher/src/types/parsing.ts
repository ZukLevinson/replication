export type FailedParse = {
  rawEntity: object;
  failure: object;
};

export type ParsingResult = {
  parsedEntities: object[];
  failedEntities: FailedParse[];
};
