import { Module } from '@nestjs/common';
import { ContinuityService } from './services';
import { ConfigurableModuleClass } from './continuity.module-definition';

@Module({
  controllers: [],
  providers: [ContinuityService],
  exports: [ContinuityService],
})
export class ContinuityModule extends ConfigurableModuleClass {}
