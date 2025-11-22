import { Inject, Injectable } from '@nestjs/common';
import {
  AsyncParseMethod,
  DataFetchEngineConfig,
  isParseConfigAsync,
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
    >
  ) {}

  public parseEntities(
    originalEntities: OriginalEntity[]
  ): Observable<ParsedEntity[]> {
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
  ): Observable<ParsedEntity[]> {
    return datasource.pipe(
      take(1),
      map((datasource) =>
        originalEntities.map((entity) =>
          parsingMethod(entity, datasource, originalEntities)
        )
      )
    );
  }

  private syncParseEntities(
    originalEntities: OriginalEntity[],
    parsingMethod: SyncParseMethod<OriginalEntity, ParsedEntity>
  ): ParsedEntity[] {
    return originalEntities.map((entity) =>
      parsingMethod(entity, originalEntities)
    );
  }
}
