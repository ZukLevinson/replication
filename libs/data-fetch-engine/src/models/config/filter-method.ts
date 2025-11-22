import { Observable } from 'rxjs';

export type AsyncFilterMethod<
  ParsedEntity extends object,
  DatasourceResponse = object[]
> = (
  entity: ParsedEntity,
  dataSource: DatasourceResponse,
  allEntities?: ParsedEntity[]
) => boolean;

export type SyncFilterMethod<ParsedEntity extends object> = (
  entity: ParsedEntity,
  allEntities?: ParsedEntity[]
) => boolean;

export type FilterConfig<
  ParsedEntity extends object,
  DatasourceResponse = object[]
> =
  | SyncFilterConfig<ParsedEntity>
  | AsyncFilterConfig<ParsedEntity, DatasourceResponse>;

const filterDatasourceFieldName = 'filterDatasource';

type SyncFilterConfig<ParsedEntity extends object> = {
  filterMethod: SyncFilterMethod<ParsedEntity>;
};

type AsyncFilterConfig<
  ParsedEntity extends object,
  DatasourceResponse = object[]
> = {
  filterMethod: AsyncFilterMethod<ParsedEntity, DatasourceResponse>;
  [filterDatasourceFieldName]: Observable<DatasourceResponse>;
};

export const isFilterConfigAsync = <
  ParsedEntity extends object,
  DatasourceResponse = object[]
>(
  filterConfig: FilterConfig<ParsedEntity, DatasourceResponse>
): filterConfig is AsyncFilterConfig<ParsedEntity, DatasourceResponse> =>
  filterDatasourceFieldName in filterConfig;
