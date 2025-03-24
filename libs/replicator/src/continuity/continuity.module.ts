import { Module } from '@nestjs/common';
import { ContinuityService } from './services';

@Module({
  controllers: [],
  providers: [ContinuityService],
  exports: [ContinuityService],
})
export class ContinuityModule {}
