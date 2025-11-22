import { Test, TestingModule } from '@nestjs/testing';
import { DataFetchingService } from './data-fetching.service';

describe('DataFetchingService', () => {
  let service: DataFetchingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataFetchingService],
    }).compile();

    service = module.get<DataFetchingService>(DataFetchingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
