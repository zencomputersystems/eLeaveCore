import { LeaveAdjustmentService } from './leave-adjustment.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { Test } from '@nestjs/testing';

describe('LeaveAdjustmentService', () => {
  let leaveAdjustmentService: LeaveAdjustmentService;
  let commonFunctionService: CommonFunctionService;
  beforeEach(async () => {

    const leaveAdjustmentServiceStub = { findAllPendingLeave: arg1 => ({}) };
    const commonFunctionServiceStub = { getListData: arg1 => ({}) };
    const module = await Test.createTestingModule({
      providers: [
        { provide: LeaveAdjustmentService, useValue: leaveAdjustmentServiceStub },
        { provide: CommonFunctionService, useValue: commonFunctionServiceStub }
      ]
    }).compile();
    leaveAdjustmentService = await module.get<LeaveAdjustmentService>(LeaveAdjustmentService);
    commonFunctionService = await module.get<CommonFunctionService>(CommonFunctionService);
  });
  it('can load instance', () => {
    expect(leaveAdjustmentService).toBeTruthy();
  });

});