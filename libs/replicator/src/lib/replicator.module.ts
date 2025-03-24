import { Module } from '@nestjs/common';
import { ConfigurableModuleClass } from './replicator.module-definition';
import { ContinuityModule } from '../continuity/continuity.module';

@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports: [ContinuityModule],
})
export class ReplicatorModule extends ConfigurableModuleClass {}
