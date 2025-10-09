export type RequestType = 'REST' | 'GQL';

export type BasicRequestData<T extends RequestType> = {
  requestType: T;
  headers?: Record<string, any>;
};
