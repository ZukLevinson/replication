export type ContinuousEntity<ENTITY> = {
  metadata: {
    id: string;
    entity: ENTITY;
  };

  dates: {
    lastUpdatedAt: string;
    createdAt: string;
  };

  continuity: {
    pastEntities: ContinuousEntity<unknown>[];
    entityVersion: number;
  };
};
