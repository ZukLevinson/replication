import { ConfigurableModuleBuilder } from '@nestjs/common';
import { DataFetchEngineConfig } from '../models';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<DataFetchEngineConfig>().build();
