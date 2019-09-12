import { GeneralLeavePolicyController } from './general-leave-policy.controller';
import { GeneralLeavePolicyService } from './general-leave-policy.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { Test } from '@nestjs/testing';

describe('GeneralLeavePolicyController', () => {
  let pipe: GeneralLeavePolicyController;
  beforeEach(async () => {
    const generalLeavePolicyServiceStub = { getList: arg1 => ({ subscribe: () => ({}) }) };
    const commonFunctionServiceStub = { sendResErrorV3: (err1, res2) => ({}) };
    const generalLeavePolicyControllerStub = {};
    const module = await Test.createTestingModule({
      providers: [
        { provide: GeneralLeavePolicyController, useValue: generalLeavePolicyControllerStub },
        { provide: GeneralLeavePolicyService, useValue: generalLeavePolicyServiceStub },
        { provide: CommonFunctionService, useValue: commonFunctionServiceStub }
      ]
    }).compile();
    pipe = await module.get<GeneralLeavePolicyController>(GeneralLeavePolicyController);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});