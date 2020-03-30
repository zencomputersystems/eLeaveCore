import { Test } from '@nestjs/testing';
import { LeavetypeEntitlementDbService } from '../../../src/admin/leavetype-entitlement/db/leavetype-entitlement.db.service';
import { XMLParserService } from 'src/common/helper/xml-parser.service';
import { LeaveTypeEntitlementService } from '../../../src/admin/leavetype-entitlement/leavetype-entitlement.service';
import { PendingLeaveService } from 'src/admin/approval-override/pending-leave.service';
import { UserprofileDbService } from '../../../src/api/userprofile/db/userprofile.db.service';
import { CompanyDbService } from '../../../src/admin/company/company.service';
import { LeavetypeService } from '../../../src/admin/leavetype/leavetype.service';
import { HttpService } from '@nestjs/common';
import { QueryParserService } from '../../../src/common/helper/query-parser.service';
describe('LeaveTypeEntitlementService', () => {
  let service: LeaveTypeEntitlementService;
  beforeEach(async () => {
    const leavetypeEntitlementDbServiceStub = {
      findAll: tenantId1 => ({ pipe: () => ({}) }),
      findById: (tenantId1, entitlementId2) => ({ pipe: () => ({}) })
    };
    const xMLParserServiceStub = { convertXMLToJson: arg1 => ({}) };
    const httpServiceStub = {
      get: url1 => ({
        subscribe: () => ({})
      })
    };
    const module = await Test.createTestingModule({
      providers: [
        PendingLeaveService,
        LeaveTypeEntitlementService,
        {
          provide: LeavetypeEntitlementDbService,
          useValue: leavetypeEntitlementDbServiceStub
        },
        { provide: XMLParserService, useValue: xMLParserServiceStub },
        UserprofileDbService,
        CompanyDbService,
        LeavetypeService,
        HttpService, {
          provide: HttpService,
          useValue: httpServiceStub
        },
        QueryParserService
      ]
    }).compile();
    service = await module.get<LeaveTypeEntitlementService>(LeaveTypeEntitlementService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
