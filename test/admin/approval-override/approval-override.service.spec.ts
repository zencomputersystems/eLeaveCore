import { ApprovalOverrideService } from '../../../src/admin/approval-override/approval-override.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { Test } from '@nestjs/testing';

const mockTaskRepository = () => ({
  findAll: jest.fn(),
});

describe('ApprovalOverrideService', () => {
  let approvalOverrideService: ApprovalOverrideService;
  let commonFunctionService: CommonFunctionService;
  beforeEach(async () => {

    const approvalOverrideServiceStub = { findAllPendingLeave: arg1 => ({}) };
    const commonFunctionServiceStub = { getListData: arg1 => ({}) };
    const module = await Test.createTestingModule({
      providers: [
        { provide: ApprovalOverrideService, useValue: approvalOverrideServiceStub },
        { provide: CommonFunctionService, useValue: commonFunctionServiceStub }
      ]
    }).compile();
    approvalOverrideService = await module.get<ApprovalOverrideService>(ApprovalOverrideService);
    commonFunctionService = await module.get<CommonFunctionService>(CommonFunctionService);
  });
  it('can load instance', () => {
    expect(approvalOverrideService).toBeTruthy();
  });

});