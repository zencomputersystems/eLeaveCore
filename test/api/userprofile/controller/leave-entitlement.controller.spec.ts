import { Test } from '@nestjs/testing';
import { LeaveEntitlementController } from '../../../../src/api/userprofile/controller/leave-entitlement/leave-entitlement.controller';
describe('LeaveEntitlementController', () => {
  let pipe: LeaveEntitlementController;
  beforeEach(async () => {
    const module = await Test.createTestingModule({ providers: [LeaveEntitlementController] }).compile();
    // pipe = Test.get(LeaveEntitlementController);
    pipe = await module.get<LeaveEntitlementController>(LeaveEntitlementController);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
