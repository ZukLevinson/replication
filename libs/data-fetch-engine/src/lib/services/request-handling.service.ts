import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  AsyncParseMethod,
  DataFetchEngineConfig,
  EntityParsingFailure,
  isParseConfigAsync,
  ParsingResult,
  SyncParseMethod,
} from '../../models';
import { MODULE_OPTIONS_TOKEN } from '../data-fetch-engine.module-definition';
import { map, Observable, of, take } from 'rxjs';

@Injectable()
export class RequestHandlingService<
  OriginalEntity extends object,
  ParsedEntity extends object,
  ParseDatasource = object[],
  FilterDatasource = object[]
> {
  private readonly parseConfig = this.config.requestHandling.parse;

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

  public parseEntities(
    originalEntities: OriginalEntity[]
  ): Observable<ParsingResult<OriginalEntity, ParsedEntity>> {
    if (isParseConfigAsync(this.parseConfig)) {
      return this.asyncParseEntities(
        originalEntities,
        this.parseConfig.parseMethod,
        this.parseConfig.parseDatasource
      );
    } else {
      return of(
        this.syncParseEntities(originalEntities, this.parseConfig.parseMethod)
      );
    }
  }

  private asyncParseEntities(
    originalEntities: OriginalEntity[],
    parsingMethod: AsyncParseMethod<
      OriginalEntity,
      ParsedEntity,
      ParseDatasource
    >,
    datasource: Observable<ParseDatasource>
  ): Observable<ParsingResult<OriginalEntity, ParsedEntity>> {
    return datasource.pipe(
      take(1),
      map((datasource) => {
        const parsedEntities: ParsedEntity[] = [];
        const failedEntities: EntityParsingFailure<OriginalEntity>[] = [];

        for (const entity of originalEntities) {
          try {
            const parsedEntity = parsingMethod(
              entity,
              datasource,
              originalEntities
            );

            parsedEntities.push(parsedEntity);
          } catch (exception) {
            this.logger.warn('failed to parse entity asynchronously', {
              entity: entity,
              exception,
            });

            failedEntities.push({ entity, exception });
          }
        }

        return {
          parsedEntities,
          failedEntities,
        };
      })
    );
  }

  private syncParseEntities(
    originalEntities: OriginalEntity[],
    parsingMethod: SyncParseMethod<OriginalEntity, ParsedEntity>
  ): ParsingResult<OriginalEntity, ParsedEntity> {
    const parsedEntities: ParsedEntity[] = [];
    const failedEntities: EntityParsingFailure<OriginalEntity>[] = [];

    for (const entity of originalEntities) {
      try {
        const parsedEntity = parsingMethod(entity, originalEntities);

        parsedEntities.push(parsedEntity);
      } catch (exception) {
        this.logger.warn('failed to parse entity synchronously', {
          entity: entity,
          exception,
        });

        failedEntities.push({ entity, exception });
      }
    }

    return {
      parsedEntities,
      failedEntities,
    };
  }
}
