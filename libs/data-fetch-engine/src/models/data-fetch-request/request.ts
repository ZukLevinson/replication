type GraphQLRequest = {
  query: string;
};

type RESTRequest = {
  body?: string;
};

export type DataFetchRequest<
  QueryParameters extends object = object,
  AdditionalParameters extends object = object,
  Headers extends object = object
> = {
  parameters?: AdditionalParameters;
  url: string;
  headers?: Headers;
  queryParameters?: QueryParameters;
} & (GraphQLRequest | RESTRequest);
