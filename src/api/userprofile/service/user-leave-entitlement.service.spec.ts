import { Test } from '@nestjs/testing';
import { UserLeaveEntitlementDbService } from '../db/user-leave-entitlement.db.service';
import { UserLeaveEntitlementSummaryDbService } from '../db/user-leave-summary.db.service';
import { AssignLeavePolicyDTO } from '../dto/leave-entitlement/assign-leave-policy.dto';
import { UserprofileDbService } from '../db/userprofile.db.service';
import { LeavetypeEntitlementDbService } from 'src/admin/leavetype-entitlement/db/leavetype-entitlement.db.service';
import { IDbService } from 'src/interface/IDbService';
import { UserInfoService } from 'src/admin/user-info/user-info.service';
import { ServiceYearCalc } from 'src/common/policy/entitlement-type/services/service-year-calculation-service/serviceYearCalc.service';
import { ProratedDateEndYearService } from 'src/common/policy/entitlement-type/services/leave-entitlement-type/proratedDateEndYear.service';
import { XMLParserService } from 'src/common/helper/xml-parser.service';
import { UserLeaveEntitlementService } from './user-leave-entitlement.service';
import { UserEntitlementAssignEntitlement } from './userentitlement-assign-entitlement.service';
import { UserEntitlementAssignPolicy } from './userentitlement-assign-policy.service';
describe('UserLeaveEntitlementService', () => {
  let service: UserLeaveEntitlementService;
  beforeEach(async () => {
    const userLeaveEntitlementDbServiceStub = {
      createByModel: (resource1, array2, array3, array4) => ({
        pipe: () => ({})
      })
    };
    const userLeaveEntitlementSummaryDbServiceStub = {
      findByFilterV2: (fields1, userFilter2) => ({})
    };
    const assignLeavePolicyDTOStub = {
      userId: {},
      leaveEntitlementId: {},
      leaveTypeId: {}
    };
    const userprofileDbServiceStub = {};
    const leavetypeEntitlementDbServiceStub = {};
    const iDbServiceStub = {
      findByFilterV2: (array1, filter2) => ({ pipe: () => ({}) })
    };
    const userInfoServiceStub = {};
    const serviceYearCalcStub = {
      calculateEmployeeServiceYear: dateOfJoin1 => ({})
    };
    const proratedDateEndYearServiceStub = {
      calculateEntitledLeave: (dateOfJoin1, serviceYear2, policy3) => ({})
    };
    const xMLParserServiceStub = { convertXMLToJson: arg1 => ({}) };
    const module = await Test.createTestingModule({
      providers: [
        UserLeaveEntitlementService,
        {
          provide: UserLeaveEntitlementDbService,
          useValue: userLeaveEntitlementDbServiceStub
        },
        {
          provide: UserLeaveEntitlementSummaryDbService,
          useValue: userLeaveEntitlementSummaryDbServiceStub
        },
        { provide: AssignLeavePolicyDTO, useValue: assignLeavePolicyDTOStub },
        { provide: UserprofileDbService, useValue: userprofileDbServiceStub },
        {
          provide: LeavetypeEntitlementDbService,
          useValue: leavetypeEntitlementDbServiceStub
        },
        // { provide: IDbService, useValue: iDbServiceStub },
        { provide: UserInfoService, useValue: userInfoServiceStub },
        { provide: ServiceYearCalc, useValue: serviceYearCalcStub },
        {
          provide: ProratedDateEndYearService,
          useValue: proratedDateEndYearServiceStub
        },
        { provide: XMLParserService, useValue: xMLParserServiceStub },
        UserEntitlementAssignEntitlement,
        UserEntitlementAssignPolicy
      ]
    }).compile();
    service = await module.get<UserLeaveEntitlementService>(UserLeaveEntitlementService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
