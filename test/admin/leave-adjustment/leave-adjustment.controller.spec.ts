import { LeaveAdjustmentController } from '../../../src/admin/leave-adjustment/leave-adjustment.controller';
import { Test } from '@nestjs/testing';
import { LeaveAdjustmentService } from '../../../src/admin/leave-adjustment/leave-adjustment.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';

describe('LeaveAdjustmentController', () => {
  let pipe: LeaveAdjustmentController;
  beforeEach(async () => {
    const generalLeavePolicyServiceStub = { getList: arg1 => ({ subscribe: () => ({}) }) };
    const commonFunctionServiceStub = { sendResErrorV3: (err1, res2) => ({}) };
    const generalLeavePolicyControllerStub = {};
    const module = await Test.createTestingModule({
      providers: [
        { provide: LeaveAdjustmentController, useValue: generalLeavePolicyControllerStub },
        { provide: LeaveAdjustmentService, useValue: generalLeavePolicyServiceStub },
        { provide: CommonFunctionService, useValue: commonFunctionServiceStub }
      ]
    }).compile();
    pipe = await module.get<LeaveAdjustmentController>(LeaveAdjustmentController);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});