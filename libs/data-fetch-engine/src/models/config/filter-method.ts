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
  | {
      filterMethod: SyncFilterMethod<ParsedEntity>;
    }
  | {
      filterMethod: AsyncFilterMethod<ParsedEntity, DatasourceResponse>;
      filterDatasource: Observable<DatasourceResponse>;
    };
