export type ReplicationOrderResponse = {
  entitiesToUpsert: object[];
  entitiesToDelete: string[];

  filteredEntities: object[];
  failedEntities: object[];

  noNewEntities: boolean;
  apiFailure: boolean;
};
