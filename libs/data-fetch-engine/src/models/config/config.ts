import { FilterConfig } from './filter-method';
import { ParseConfig } from './parse-method';

export type DataFetchEngineConfig<
  OriginalEntity extends object = object,
  ParsedEntity extends object = object,
  ParseDatasource = object[],
  FilterDatasource = object[]
> = {
  requestHandling: {
    filter: FilterConfig<ParsedEntity, FilterDatasource>;
    parse: ParseConfig<OriginalEntity, ParsedEntity, ParseDatasource>;
  };
};
