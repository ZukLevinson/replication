import {ConfigurableModuleBuilder} from "@nestjs/common";
import {SaveToPostgresDatabaseOptions} from "./models";

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<SaveToPostgresDatabaseOptions>().build();
