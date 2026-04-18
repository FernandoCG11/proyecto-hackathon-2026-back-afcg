import { Test, TestingModule } from '@nestjs/testing';
import { TaxProfileService } from './tax-profile.service';

describe('TaxProfileService', () => {
  let service: TaxProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaxProfileService],
    }).compile();

    service = module.get<TaxProfileService>(TaxProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
