import { Test } from '@nestjs/testing';
import { LeavetypeEntitlementDbService } from './db/leavetype-entitlement.db.service';
import { CreateLeaveEntitlementTypeDTO } from './dto/create-leavetype_entitlement.dto';
import { UpdateLeaveTypeEntitlementDto } from './dto/update-leavetype_entitlement.dto';
import { LeaveTypeEntitlementService } from './leavetype-entitlement.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { LeavetypeEntitlementController } from './leavetype-entitlement.controller';
describe('LeavetypeEntitlementController', () => {
  let pipe: LeavetypeEntitlementController;
  beforeEach(async () => {
    const leavetypeEntitlementDbServiceStub = {
      create: (arg1, createLeaveEntitlementDTO2) => ({ subscribe: () => ({}) }),
      update: (arg1, updateLeaveTypeEntitlementDTO2) => ({
        subscribe: () => ({})
      })
    };
    const createLeaveEntitlementTypeDTOStub = {};
    const updateLeaveTypeEntitlementDtoStub = {};
    const leaveTypeEntitlementServiceStub = {
      getDetail: (arg1, id2) => ({ subscribe: () => ({}) }),
      getList: arg1 => ({ subscribe: () => ({}) })
    };
    const commonFunctionServiceStub = {
      sendResErrorV2: (res1, number2, string3) => ({})
    };
    const module = await Test.createTestingModule({
      providers: [
        LeavetypeEntitlementController,
        {
          provide: LeavetypeEntitlementDbService,
          useValue: leavetypeEntitlementDbServiceStub
        },
        {
          provide: CreateLeaveEntitlementTypeDTO,
          useValue: createLeaveEntitlementTypeDTOStub
        },
        {
          provide: UpdateLeaveTypeEntitlementDto,
          useValue: updateLeaveTypeEntitlementDtoStub
        },
        {
          provide: LeaveTypeEntitlementService,
          useValue: leaveTypeEntitlementServiceStub
        },
        { provide: CommonFunctionService, useValue: commonFunctionServiceStub }
      ]
    }).compile();
    // pipe = Test.get(LeavetypeEntitlementController);
    pipe = await module.get<LeavetypeEntitlementController>(LeavetypeEntitlementController);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
