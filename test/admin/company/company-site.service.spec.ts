import { CompanySiteService } from '../../../src/admin/company/company-site.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { Test } from '@nestjs/testing';

describe('CompanySiteService', () => {
  let companySiteService: CompanySiteService;
  let commonFunctionService: CommonFunctionService;
  beforeEach(async () => {

    const companySiteServiceStub = { findAllPendingLeave: arg1 => ({}) };
    const commonFunctionServiceStub = { getListData: arg1 => ({}) };
    const module = await Test.createTestingModule({
      providers: [
        { provide: CompanySiteService, useValue: companySiteServiceStub },
        { provide: CommonFunctionService, useValue: commonFunctionServiceStub }
      ]
    }).compile();
    companySiteService = await module.get<CompanySiteService>(CompanySiteService);
    commonFunctionService = await module.get<CommonFunctionService>(CommonFunctionService);
  });
  it('can load instance', () => {
    expect(companySiteService).toBeTruthy();
  });

});