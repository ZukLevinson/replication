import { Inject, Injectable } from '@nestjs/common';
import { ReplicatorConfig } from '../models';
import { MODULE_OPTIONS_TOKEN } from '../replicator.module-definition';
import {
  ContinuousEntity,
  Entity,
  Interaction,
  Page,
} from '@replication/models';
import { ContinuityService } from '../../continuity/services';

@Injectable()
export class ReplicatorService {
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private readonly config: ReplicatorConfig,
    private readonly continuityService: ContinuityService
  ) {}

  async onPage<ENTITY extends Entity>(
    page: Page<ENTITY>
  ): Promise<Interaction> {
    const upsertContinuousEntities =
      await this.convertPageIntoContinuityEntities(page);

    const upsertInteraction =
      await this.config.saveToDatabase.upsertEntities<ENTITY>(
        upsertContinuousEntities
      );

    const deleteInteraction = await this.config.saveToDatabase.deleteEntities(
      page.deletes
    );

    return this.combineInteractions(upsertInteraction, deleteInteraction);
  }

  private convertPageIntoContinuityEntities<ENTITY extends Entity>(
    page: Page<ENTITY>
  ): Promise<ContinuousEntity<ENTITY>[]> {
    return this.continuityService.createContinuityEntities(page.updates);
  }

  private combineInteractions(
    upsertInteraction: Interaction,
    deleteInteraction: Interaction
  ): Interaction {
    //TODO: continue
    return {
      isSuccess: true,
    };
  }
}
