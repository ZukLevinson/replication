import { BasicRequestData } from './basic';

export type GQLRequestData = BasicRequestData<'GQL'> & {
  query: string;
  variables?: Record<string, any>;
};
