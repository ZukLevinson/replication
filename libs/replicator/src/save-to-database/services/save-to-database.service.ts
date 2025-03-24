import { Injectable } from '@nestjs/common';
import { ContinuousEntity, Interaction } from '@replication/models';

@Injectable()
export abstract class SaveToDatabaseService {
  public abstract upsertEntities<T>(
    entities: ContinuousEntity<T>[]
  ): Promise<Interaction>;

  public abstract deleteEntities(entities: string[]): Promise<Interaction>;
}
