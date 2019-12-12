import { Test } from '@nestjs/testing';
import { LeavetypeEntitlementDbService } from '../../../src/admin/leavetype-entitlement/db/leavetype-entitlement.db.service';
import { CreateLeaveEntitlementTypeDTO } from '../../../src/admin/leavetype-entitlement/dto/create-leavetype_entitlement.dto';
import { UpdateLeaveTypeEntitlementDto } from '../../../src/admin/leavetype-entitlement/dto/update-leavetype_entitlement.dto';
import { LeaveTypeEntitlementService } from '../../../src/admin/leavetype-entitlement/leavetype-entitlement.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { LeavetypeEntitlementController } from '../../../src/admin/leavetype-entitlement/leavetype-entitlement.controller';
import { UserLeaveEntitlementDbService } from 'src/api/userprofile/db/user-leave-entitlement.db.service';
import { HttpModule } from '@nestjs/common';
import { QueryParserService } from '../../../src/common/helper/query-parser.service';
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

      imports: [HttpModule],
      providers: [
        LeavetypeEntitlementController,
        UserLeaveEntitlementDbService,
        QueryParserService,
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
