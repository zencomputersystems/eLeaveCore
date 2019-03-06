import { Test, TestingModule } from '@nestjs/testing';
import { LeaveEntitlementController } from './leave-entitlement.controller';

describe('LeaveEntitlement Controller', () => {
  let controller: LeaveEntitlementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeaveEntitlementController],
    }).compile();

    controller = module.get<LeaveEntitlementController>(LeaveEntitlementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
