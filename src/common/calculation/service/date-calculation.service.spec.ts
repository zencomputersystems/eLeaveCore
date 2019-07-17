import { Test } from '@nestjs/testing';
import { DateCalculationService } from './date-calculation.service';
describe('DateCalculationService', () => {
  let service: DateCalculationService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({ 
      providers: [
        DateCalculationService
      ] 
    }).compile();
    service = await module.get<DateCalculationService>(DateCalculationService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
