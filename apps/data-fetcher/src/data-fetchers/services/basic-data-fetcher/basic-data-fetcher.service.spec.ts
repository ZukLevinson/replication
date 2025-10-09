import { Test, TestingModule } from '@nestjs/testing';
import { BasicDataFetcherService } from './basic-data-fetcher.service';

describe('BasicDataFetcherService', () => {
  let service: BasicDataFetcherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BasicDataFetcherService],
    }).compile();

    service = module.get<BasicDataFetcherService>(BasicDataFetcherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
