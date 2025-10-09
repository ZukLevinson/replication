import {
  APIResponse,
  Reality,
  ReplicationOrder,
  ReplicationOrderResponse,
} from '@replication/models';
import {
  FailedFilter,
  FailedParse,
  FilterResult,
  ParsingResult,
} from '../../../types';
import {
  FilteringMethodMissingException,
  ParsingMethodMissingException,
} from '../../../exceptions';
import { isEmpty } from 'lodash';

export abstract class BasicDataFetcherService {
  protected constructor(
    protected readonly url: string,
    private readonly parsingMethods: Record<string, (input: object) => object>,
    private readonly filterMethods: Record<string, (input: object) => boolean>,
    private readonly headers?: Record<string, any>
  ) {}

  public getLatestEntitiesFromDataVersion(
    replicationOrder: ReplicationOrder
  ): ReplicationOrderResponse {
    try {
      const update = this.fetchUpdateFromAPIByDataVersion(
        replicationOrder.dataVersion,
        replicationOrder.reality,
        this.createHeadersObject(replicationOrder.requestData.headers)
      );

      const parsing = this.parseEntities(
        replicationOrder.entityName,
        update.updatedEntities
      );
      const filtering = this.filterEntities(
        replicationOrder.entityName,
        parsing.parsedEntities
      );

      const combinedFailures = [
        ...parsing.failedEntities,
        ...filtering.failedEntities,
      ];

      return {
        entitiesToDelete: update.deletedEntitiesIds,
        noNewEntities: this.isNoNewEntities(parsing, filtering),
        failedEntities: combinedFailures,
        entitiesToUpsert: filtering.updatedEntities,
        filteredEntities: filtering.filteredEntities,
        apiFailure: false,
      };
    } catch (e) {
      return {
        filteredEntities: [],
        entitiesToUpsert: [],
        failedEntities: [],
        noNewEntities: false,
        entitiesToDelete: [],
        apiFailure: true,
      };
    }
  }

  private isNoNewEntities(
    parsingResult: ParsingResult,
    filterResult: FilterResult
  ): boolean {
    const combinedFailures = [
      ...parsingResult.failedEntities,
      ...filterResult.failedEntities,
    ];

    return (
      isEmpty(filterResult.updatedEntities) &&
      isEmpty(combinedFailures) &&
      isEmpty(filterResult.filteredEntities)
    );
  }

  abstract fetchUpdateFromAPIByDataVersion(
    dataVersion: string,
    reality: Reality,
    headers?: Record<string, any>
  ): APIResponse;

  private filterEntities(
    entityName: string,
    parsedEntities: object[]
  ): FilterResult {
    const filteredEntities: object[] = [];
    const updatedEntities: object[] = [];
    const failedEntities: FailedFilter[] = [];

    parsedEntities.forEach((entity) => {
      try {
        const shouldFilterOut = this.filterEntity(entityName, entity);

        if (shouldFilterOut) {
          filteredEntities.push(entity);
        } else {
          updatedEntities.push(entity);
        }
      } catch (e) {
        failedEntities.push({
          failure: e,
          parsedEntity: entity,
        });
      }
    });

    return {
      filteredEntities,
      failedEntities,
      updatedEntities,
    };
  }

  private parseEntities(
    entityName: string,
    rawUpdates: object[]
  ): ParsingResult {
    const parsedEntities: object[] = [];
    const failedEntities: FailedParse[] = [];

    rawUpdates.forEach((update) => {
      try {
        const parsedEntity = this.parseEntity(entityName, update);

        parsedEntities.push(parsedEntity);
      } catch (e) {
        failedEntities.push({
          failure: e,
          rawEntity: update,
        });
      }
    });

    return {
      parsedEntities,
      failedEntities,
    };
  }

  private parseEntity(entityName: string, entity: object): object {
    const method = this.parsingMethods[entityName];

    if (!method) {
      throw new ParsingMethodMissingException(entityName);
    }

    return method(entity);
  }

  private filterEntity(entityName: string, entity: object): boolean {
    const method = this.filterMethods[entityName];

    if (!method) {
      throw new FilteringMethodMissingException(entityName);
    }

    return method(entity);
  }

  private createHeadersObject(
    headers: Record<string, any>
  ): Record<string, any> {
    return {
      ...(this.headers ?? {}),
      ...(headers ?? {}),
    };
  }
}
