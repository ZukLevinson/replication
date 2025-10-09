import { Reality } from '../general';
import { GQLRequestData, RESTRequestData } from '../request';

export type ReplicationOrder = {
  id: string; // ambiguous uuid to represent the order
  dataVersion: string;
  entityName: string;
  reality: Reality;
  requestData: GQLRequestData | RESTRequestData;
};
