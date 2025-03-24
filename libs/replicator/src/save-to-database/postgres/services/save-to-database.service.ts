import { Inject, Injectable } from '@nestjs/common';
import { DatabaseInteraction, SaveToPostgresDatabaseOptions } from '../models';
import { MODULE_OPTIONS_TOKEN } from '../save-to-database.module-definition';
import { ContinuousEntity } from '@replication/models';

@Injectable()
export abstract class SaveToPostgresDatabaseService {
  protected constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly options: SaveToPostgresDatabaseOptions
  ) {}

  protected abstract upsertEntities<T>(
    entities: ContinuousEntity<T>
  ): Promise<DatabaseInteraction[]>;

  protected abstract deleteEntities(
    entities: string[]
  ): Promise<DatabaseInteraction[]>;
}
