import { Module } from '@nestjs/common';
import { ParsingService } from './services/parsing.service';

@Module({
  providers: [ParsingService],
})
export class RequestHandlingModule {}
