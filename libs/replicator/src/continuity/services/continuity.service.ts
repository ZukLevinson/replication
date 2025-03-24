import { Injectable } from '@nestjs/common';
import { ContinuousEntity } from '@replication/models';

@Injectable()
export class ContinuityService {
  createContinuityEntity<T>(entity: T): ContinuousEntity<T> {}
}
