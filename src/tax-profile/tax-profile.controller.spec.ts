import { Test, TestingModule } from '@nestjs/testing';
import { TaxProfileController } from './tax-profile.controller';
import { TaxProfileService } from './tax-profile.service';

describe('TaxProfileController', () => {
  let controller: TaxProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaxProfileController],
      providers: [TaxProfileService],
    }).compile();

    controller = module.get<TaxProfileController>(TaxProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
