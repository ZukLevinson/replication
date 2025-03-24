export type Entity = { id: string };

export type ContinuousEntity<ENTITY extends Entity> = {
  id: string;
  entity: ENTITY;
  typeVersion: number;

  lastUpdatedAt: string;
};
