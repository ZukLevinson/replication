import { Inject, Injectable } from '@nestjs/common';
import { ReplicatorConfig } from '../models';
import { MODULE_OPTIONS_TOKEN } from '../replicator.module-definition';
import { ContinuousEntity, Interaction, Page } from '@replication/models';
import { ContinuityService } from '../../continuity/services';

@Injectable()
export class ReplicatorService {
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private readonly config: ReplicatorConfig,
    private readonly continuityService: ContinuityService
  ) {}

  async onPage<T>(page: Page<T>): Promise<Interaction> {
    const upsertContinuousEntities =
      this.convertPageIntoContinuityEntities(page);

    const upsertInteraction =
      await this.config.saveToDatabase.upsertEntities<T>(
        upsertContinuousEntities
      );

    const deleteInteraction = await this.config.saveToDatabase.deleteEntities(
      page.deletes
    );

    return this.combineInteractions(upsertInteraction, deleteInteraction);
  }

  private convertPageIntoContinuityEntities<T>(
    page: Page<T>
  ): ContinuousEntity<T>[] {
    //TODO: continue
    return [];
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
