import { ReplicatorConfig } from './models';
import { ConfigurableModuleBuilder } from '@nestjs/common';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<ReplicatorConfig>()
    .setClassMethodName('forRoot')
    .build();
