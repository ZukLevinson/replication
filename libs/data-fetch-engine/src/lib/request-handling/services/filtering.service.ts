import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  AsyncFilterMethod,
  DataFetchEngineConfig,
  EntityFilteringException,
  FilteringResult,
  isFilterConfigAsync,
  SyncFilterMethod,
} from '../../../models';
import { MODULE_OPTIONS_TOKEN } from '../../data-fetch-engine.module-definition';
import { map, Observable, of, take } from 'rxjs';

@Injectable()
export class FilteringService<
  OriginalEntity extends object,
  ParsedEntity extends object,
  ParseDatasource = object[],
  FilterDatasource = object[]
> {
  private readonly parseConfig = this.config.requestHandling.filter;

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly config: DataFetchEngineConfig<
      OriginalEntity,
      ParsedEntity,
      ParseDatasource,
      FilterDatasource
    >,
    private readonly logger: Logger
  ) {}

  public filterEntities(
    originalEntities: ParsedEntity[]
  ): Observable<FilteringResult<ParsedEntity>> {
    if (isFilterConfigAsync(this.parseConfig)) {
      return this.asyncFilterEntities(
        originalEntities,
        this.parseConfig.filterMethod,
        this.parseConfig.filterDatasource
      );
    } else {
      return of(
        this.syncFilterEntities(originalEntities, this.parseConfig.filterMethod)
      );
    }
  }

  private asyncFilterEntities(
    entities: ParsedEntity[],
    filteringMethod: AsyncFilterMethod<ParsedEntity, FilterDatasource>,
    datasource: Observable<FilterDatasource>
  ): Observable<FilteringResult<ParsedEntity>> {
    return datasource.pipe(
      take(1),
      map((datasource) => {
        const filteredInEntities: ParsedEntity[] = [];
        const filteredOutEntities: ParsedEntity[] = [];
        const failedEntities: EntityFilteringException<ParsedEntity>[] = [];

        for (const entity of entities) {
          try {
            const shouldFilterIn = filteringMethod(
              entity,
              datasource,
              entities
            );

            if (shouldFilterIn) {
              filteredInEntities.push(entity);
            } else {
              filteredOutEntities.push(entity);
            }
          } catch (exception) {
            this.logger.warn('failed to filter entity asynchronously', {
              entity: entity,
              exception,
            });

            failedEntities.push(
              new EntityFilteringException(entity, exception)
            );
          }
        }
        return {
          filteredOutEntities,
          filteredInEntities,
          failedEntities,
        };
      })
    );
  }

  private syncFilterEntities(
    entities: ParsedEntity[],
    filteringMethod: SyncFilterMethod<ParsedEntity>
  ): FilteringResult<ParsedEntity> {
    const filteredInEntities: ParsedEntity[] = [];
    const filteredOutEntities: ParsedEntity[] = [];
    const failedEntities: EntityFilteringException<ParsedEntity>[] = [];

    for (const entity of entities) {
      try {
        const shouldFilterIn = filteringMethod(entity, entities);

        if (shouldFilterIn) {
          filteredInEntities.push(entity);
        } else {
          filteredOutEntities.push(entity);
        }
      } catch (exception) {
        this.logger.warn('failed to filter entity synchronously', {
          entity: entity,
          exception,
        });

        failedEntities.push(new EntityFilteringException(entity, exception));
      }
    }

    return {
      filteredOutEntities,
      filteredInEntities,
      failedEntities,
    };
  }
}
