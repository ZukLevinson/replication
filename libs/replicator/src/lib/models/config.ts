import { SaveToDatabaseService } from '../../save-to-database';

export type ReplicatorConfig = {
  saveToDatabase: SaveToDatabaseService;
  replicateEveryInMs: number;
};
