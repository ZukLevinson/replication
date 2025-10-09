import { BasicRequestData } from './basic';

export type RESTRequestData = BasicRequestData<'REST'> & {
  body: object;
};
