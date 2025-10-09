export type FilterResult = {
  updatedEntities: object[];
  filteredEntities: object[];
  failedEntities: FailedFilter[];
};

export type FailedFilter = {
  parsedEntity: object;
  failure: object;
};
