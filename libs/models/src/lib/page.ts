import { Entity } from './entity';

export type Page<ENTITY extends Entity> = {
  updates: ENTITY[];
  deletes: string[];
};
