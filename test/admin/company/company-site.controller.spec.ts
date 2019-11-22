import { CompanySiteController } from '../../../src/admin/company/company-site.controller';
import { Test } from '@nestjs/testing';
import { CompanySiteService } from '../../../src/admin/company/company-site.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';

describe('CompanySiteController', () => {
  let pipe: CompanySiteController;
  beforeEach(async () => {
    const companySiteServiceStub = { getList: arg1 => ({ subscribe: () => ({}) }) };
    const commonFunctionServiceStub = { sendResErrorV3: (err1, res2) => ({}) };
    const module = await Test.createTestingModule({
      providers: [
        CompanySiteController,
        { provide: CompanySiteService, useValue: companySiteServiceStub },
        { provide: CommonFunctionService, useValue: commonFunctionServiceStub }
      ]
    }).compile();
    pipe = await module.get<CompanySiteController>(CompanySiteController);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});