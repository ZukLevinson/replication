export type ContinuousEntity<ENTITY> = {
  id: string;
  entity: ENTITY;
  typeVersion: number;

  lastUpdatedAt: string;
};
