import { Test } from '@nestjs/testing';
import { ApprovalService } from 'src/common/approval/service/approval.service';
import { ApprovedLeaveDTO } from '../../../src/api/leave/dto/approved-leave.dto';
import { ApprovedController } from '../../../src/api/leave/controller/approval/approval.controller';
describe('ApprovedController', () => {
  let pipe: ApprovedController;
  beforeEach(async () => {
    const approvalServiceStub = {
      onPolicyChanged: (string1, number2, arg3) => ({ subscribe: () => ({}) }),
      onApproveReject: (arg1, arg2, arg3, arg4) => ({ subscribe: () => ({}) })
    };
    const approvedLeaveDTOStub = { id: {} };
    const module = await Test.createTestingModule({
      providers: [
        ApprovedController,
        { provide: ApprovalService, useValue: approvalServiceStub },
        { provide: ApprovedLeaveDTO, useValue: approvedLeaveDTOStub }
      ]
    }).compile();
    pipe = await module.get<ApprovedController>(ApprovedController);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
