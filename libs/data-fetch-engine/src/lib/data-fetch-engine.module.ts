import { Module } from '@nestjs/common';
import { RequestHandlingService } from './services/request-handling.service';
import { DataFetchingService } from './services/data-fetching.service';
import { ConfigurableModuleClass } from './data-fetch-engine.module-definition';

@Module({
  controllers: [],
  providers: [RequestHandlingService, DataFetchingService],
  exports: [],
})
export class DataFetchEngineModule extends ConfigurableModuleClass {}
