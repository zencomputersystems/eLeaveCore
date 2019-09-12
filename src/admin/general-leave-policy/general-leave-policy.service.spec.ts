import { GeneralLeavePolicyService } from './general-leave-policy.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { Test } from '@nestjs/testing';

describe('GeneralLeavePolicyService', () => {
  let generalLeavePolicyService: GeneralLeavePolicyService;
  let commonFunctionService: CommonFunctionService;
  beforeEach(async () => {

    const generalLeavePolicyServiceStub = { findAllPendingLeave: arg1 => ({}) };
    const commonFunctionServiceStub = { getListData: arg1 => ({}) };
    const module = await Test.createTestingModule({
      providers: [
        { provide: GeneralLeavePolicyService, useValue: generalLeavePolicyServiceStub },
        { provide: CommonFunctionService, useValue: commonFunctionServiceStub }
      ]
    }).compile();
    generalLeavePolicyService = await module.get<GeneralLeavePolicyService>(GeneralLeavePolicyService);
    commonFunctionService = await module.get<CommonFunctionService>(CommonFunctionService);
  });
  it('can load instance', () => {
    expect(generalLeavePolicyService).toBeTruthy();
  });

});