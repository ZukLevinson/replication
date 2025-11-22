import { Observable } from 'rxjs';

export type AsyncParseMethod<
  OriginalEntity extends object,
  ParsedEntity extends object,
  DatasourceResponse = object[]
> = (
  entity: OriginalEntity,
  dataSource: DatasourceResponse,
  allEntities?: OriginalEntity[]
) => ParsedEntity;

export type SyncParseMethod<
  OriginalEntity extends object,
  ParsedEntity extends object
> = (entity: OriginalEntity, allEntities?: OriginalEntity[]) => ParsedEntity;

const parseDatasourceFieldName = 'parseDatasource';

type SyncParseConfig<
  OriginalEntity extends object,
  ParsedEntity extends object
> = {
  parseMethod: SyncParseMethod<OriginalEntity, ParsedEntity>;
};

type AsyncParseConfig<
  OriginalEntity extends object,
  ParsedEntity extends object,
  DatasourceResponse = object[]
> = {
  parseMethod: AsyncParseMethod<
    OriginalEntity,
    ParsedEntity,
    DatasourceResponse
  >;
  [parseDatasourceFieldName]: Observable<DatasourceResponse>;
};

export type ParseConfig<
  OriginalEntity extends object,
  ParsedEntity extends object,
  DatasourceResponse = object[]
> =
  | SyncParseConfig<OriginalEntity, ParsedEntity>
  | AsyncParseConfig<OriginalEntity, ParsedEntity, DatasourceResponse>;

export const isParseConfigAsync = <
  OriginalEntity extends object,
  ParsedEntity extends object,
  DatasourceResponse = object[]
>(
  parseConfig: ParseConfig<OriginalEntity, ParsedEntity, DatasourceResponse>
): parseConfig is AsyncParseConfig<
  OriginalEntity,
  ParsedEntity,
  DatasourceResponse
> => parseDatasourceFieldName in parseConfig;
