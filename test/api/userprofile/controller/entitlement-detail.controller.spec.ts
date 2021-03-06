import { Test } from '@nestjs/testing';
import { AssignLeavePolicyDTO } from '../../../../src/api/userprofile/dto/leave-entitlement/assign-leave-policy.dto';
import { UserLeaveEntitlementService } from '../../../../src/api/userprofile/service/user-leave-entitlement.service';
import { EntitlementDetailController } from '../../../../src/api/userprofile/controller/entitlement-detail/entitlement-detail.controller';
import { CommonFunctionService } from '../../../../src/common/helper/common-function.services';
describe('EntitlementDetailController', () => {
  let pipe: EntitlementDetailController;
  beforeEach(async () => {
    const assignLeavePolicyDTOStub = {};
    const userLeaveEntitlementServiceStub = {
      getEntitlementList: (arg1, arg2) => ({ subscribe: () => ({}) }),
      assignEntitlement: (arg1, assignLeaveDTO2) => ({ subscribe: () => ({}) })
    };
    const module = await Test.createTestingModule({
      providers: [
        EntitlementDetailController, CommonFunctionService,
        { provide: AssignLeavePolicyDTO, useValue: assignLeavePolicyDTOStub },
        {
          provide: UserLeaveEntitlementService,
          useValue: userLeaveEntitlementServiceStub
        }
      ]
    }).compile();
    // pipe = Test.get(EntitlementDetailController);
    pipe = await module.get<EntitlementDetailController>(EntitlementDetailController);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
