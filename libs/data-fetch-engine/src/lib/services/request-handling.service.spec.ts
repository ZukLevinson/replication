import { Test, TestingModule } from '@nestjs/testing';
import { RequestHandlingService } from './request-handling.service';

describe('RequestHandlingService', () => {
  let service: RequestHandlingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestHandlingService],
    }).compile();

    service = module.get<RequestHandlingService>(RequestHandlingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
