import { ConfigurableModuleBuilder } from '@nestjs/common';
import { ContinuityConfig } from './models';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<ContinuityConfig>()
    .setClassMethodName('forRoot')
    .build();
