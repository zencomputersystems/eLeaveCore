import { Test } from '@nestjs/testing';
import { CompanyController } from './company.controller';
describe('CompanyController', () => {
  let pipe: CompanyController;
  beforeEach(async () => {
    const module = await Test.createTestingModule({ 
      providers: [CompanyController] 
    }).compile();
    pipe = await module.get<CompanyController>(CompanyController);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
