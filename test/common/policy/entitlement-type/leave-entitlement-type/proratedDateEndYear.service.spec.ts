import { Test } from '@nestjs/testing';
import { XMLParserService } from 'src/common/helper/xml-parser.service';
import { EntitlementRoundingService } from 'src/common/policy/entitlement-rounding/services/entitlement-rounding.service';
import { LeaveTypePropertiesXmlDTO } from 'src/admin/leavetype-entitlement/dto/xml/leavetype-properties.xml.dto';
import { ProratedDateEndYearService } from '../../../../../src/common/policy/entitlement-type/services/leave-entitlement-type/proratedDateEndYear.service';
describe('ProratedDateEndYearService', () => {
  let service: ProratedDateEndYearService;
  beforeEach(async () => {
    const xMLParserServiceStub = {};
    const entitlementRoundingServiceStub = {};
    const leaveTypePropertiesXmlDTOStub = {};
    const module = await Test.createTestingModule({
      providers: [
        ProratedDateEndYearService,
        { provide: XMLParserService, useValue: xMLParserServiceStub },
        {
          provide: EntitlementRoundingService,
          useValue: entitlementRoundingServiceStub
        },
        {
          provide: LeaveTypePropertiesXmlDTO,
          useValue: leaveTypePropertiesXmlDTOStub
        }
      ]
    }).compile();
    service = await module.get<ProratedDateEndYearService>(ProratedDateEndYearService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
