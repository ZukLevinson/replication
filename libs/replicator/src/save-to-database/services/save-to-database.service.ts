import { Injectable } from '@nestjs/common';
import { ContinuousEntity, Entity, Interaction } from '@replication/models';

@Injectable()
export abstract class SaveToDatabaseService {
  public abstract upsertEntities<ENTITY extends Entity>(
    entities: ContinuousEntity<ENTITY>[]
  ): Promise<Interaction>;

  public abstract deleteEntities(entities: string[]): Promise<Interaction>;
}
