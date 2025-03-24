import { Inject, Injectable } from '@nestjs/common';
import { ContinuousEntity } from '@replication/models';
import { ContinuityConfig, VersionUpdate } from '../models';
import { MODULE_OPTIONS_TOKEN } from '../continuity.module-definition';
import * as moment from 'moment';
import { isNil } from '@nestjs/common/utils/shared.utils';

@Injectable()
export class ContinuityService {
  private latestVersionUpdate: VersionUpdate = {
    version: -1,
    lastUpdatedAt: null,
  };

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private readonly config: ContinuityConfig
  ) {}

  async createContinuityEntity<T>(
    id: string,
    entity: T
  ): Promise<ContinuousEntity<T>> {
    const latestVersion = await this.getLatestVersion();

    return {
      id,
      entity,
      lastUpdatedAt: moment().toISOString(),
      typeVersion: latestVersion,
    };
  }

  private async updateLatestVersionFromRemote() {
    const version = await this.config.getLatestVersion();

    this.latestVersionUpdate = {
      version,
      lastUpdatedAt: moment().toISOString(),
    };
  }

  private async getLatestVersion(): Promise<number> {
    if (isNil(this.latestVersionUpdate.lastUpdatedAt)) {
      await this.updateLatestVersionFromRemote();
    } else {
      const isLastUpdatedAtTooOld = moment(
        this.latestVersionUpdate.lastUpdatedAt
      ).isSameOrBefore(
        moment().subtract(this.config.keepVersionEveryInMs, 'milliseconds')
      );

      if (isLastUpdatedAtTooOld) {
        await this.updateLatestVersionFromRemote();
      }
    }

    return this.latestVersionUpdate.version;
  }
}
