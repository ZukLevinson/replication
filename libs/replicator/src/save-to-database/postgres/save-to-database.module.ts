import { Module } from '@nestjs/common';
import { ConfigurableModuleClass } from './save-to-database.module-definition';
import { SaveToPostgresDatabaseService } from './services';

@Module({
  controllers: [],
  providers: [SaveToPostgresDatabaseService],
  imports: [],
  exports: [],
})
export class SaveToDatabaseModule extends ConfigurableModuleClass {
  constructor(private readonly services: SaveToPostgresDatabaseService) {
    super();
  }
}
