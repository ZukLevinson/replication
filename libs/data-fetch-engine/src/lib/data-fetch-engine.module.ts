import { Module } from '@nestjs/common';
import { DataFetchingService } from './services/data-fetching.service';
import { ConfigurableModuleClass } from './data-fetch-engine.module-definition';
import { RequestHandlingModule } from './request-handling/request-handling.module';

@Module({
  controllers: [],
  providers: [DataFetchingService],
  exports: [],
  imports: [RequestHandlingModule],
})
export class DataFetchEngineModule extends ConfigurableModuleClass {}
