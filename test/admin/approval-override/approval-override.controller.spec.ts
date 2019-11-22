import { ApprovalOverrideController } from '../../../src/admin/approval-override/approval-override.controller';
import { ApprovalOverrideService } from '../../../src/admin/approval-override/approval-override.service';
import { Test } from '@nestjs/testing';
import { CommonFunctionService } from 'src/common/helper/common-function.services';

describe('ApprovalOverrideController', () => {
  let pipe: ApprovalOverrideController;
  beforeEach(async () => {
    const approvalOverrideServiceStub = { getList: arg1 => ({ subscribe: () => ({}) }) };
    const commonFunctionServiceStub = { sendResErrorV3: (err1, res2) => ({}) };
    const module = await Test.createTestingModule({
      providers: [
        ApprovalOverrideController,
        { provide: ApprovalOverrideService, useValue: approvalOverrideServiceStub },
        { provide: CommonFunctionService, useValue: commonFunctionServiceStub }
      ]
    }).compile();
    pipe = await module.get<ApprovalOverrideController>(ApprovalOverrideController);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});