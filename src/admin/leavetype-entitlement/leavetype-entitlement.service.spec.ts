import { Test } from '@nestjs/testing';
import { LeavetypeEntitlementDbService } from './db/leavetype-entitlement.db.service';
import { XMLParserService } from 'src/common/helper/xml-parser.service';
import { LeaveTypeEntitlementService } from './leavetype-entitlement.service';
describe('LeaveTypeEntitlementService', () => {
  let service: LeaveTypeEntitlementService;
  beforeEach(async () => {
    const leavetypeEntitlementDbServiceStub = {
      findAll: tenantId1 => ({ pipe: () => ({}) }),
      findById: (tenantId1, entitlementId2) => ({ pipe: () => ({}) })
    };
    const xMLParserServiceStub = { convertXMLToJson: arg1 => ({}) };
    const module = await Test.createTestingModule({
      providers: [
        LeaveTypeEntitlementService,
        {
          provide: LeavetypeEntitlementDbService,
          useValue: leavetypeEntitlementDbServiceStub
        },
        { provide: XMLParserService, useValue: xMLParserServiceStub }
      ]
    }).compile();
    service = await module.get<LeaveTypeEntitlementService>(LeaveTypeEntitlementService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
