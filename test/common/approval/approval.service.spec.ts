import { Test } from '@nestjs/testing';
import { LeaveTransactionDbService } from 'src/api/leave/db/leave-transaction.db.service';
import { LeaveTransactionModel } from 'src/api/leave/model/leave-transaction.model';
import { ApprovalService } from '../../../src/common/approval/service/approval.service';
describe('ApprovalService', () => {
  let service: ApprovalService;
  beforeEach(async () => {
    const leaveTransactionDbServiceStub = {
      findByFilterV2: (array1, filter2) => ({}),
      updateByModel: (resource1, array2, array3, array4) => ({
        pipe: () => ({})
      })
    };
    const leaveTransactionModelStub = {
      CURRENT_APPROVAL_LEVEL: {},
      STATES: {},
      STATUS: {}
    };
    const module = await Test.createTestingModule({
      providers: [
        ApprovalService,
        {
          provide: LeaveTransactionDbService,
          useValue: leaveTransactionDbServiceStub
        },
        { provide: LeaveTransactionModel, useValue: leaveTransactionModelStub }
      ]
    }).compile();
    // service = Test.get(ApprovalService);
    service = await module.get<ApprovalService>(ApprovalService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
