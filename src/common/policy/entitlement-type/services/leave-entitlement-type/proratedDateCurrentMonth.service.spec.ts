import { Test } from '@nestjs/testing';
import { XMLParserService } from 'src/common/helper/xml-parser.service';
import { LeaveTypePropertiesXmlDTO } from 'src/admin/leavetype-entitlement/dto/xml/leavetype-properties.xml.dto';
import { ProratedDateCurrentMonthService } from './proratedDateCurrentMonth.service';
describe('ProratedDateCurrentMonthService', () => {
  let service: ProratedDateCurrentMonthService;
  beforeEach(async () => {
    const xMLParserServiceStub = {};
    const leaveTypePropertiesXmlDTOStub = {};
    const module = await Test.createTestingModule({
      providers: [
        ProratedDateCurrentMonthService,
        { provide: XMLParserService, useValue: xMLParserServiceStub },
        {
          provide: LeaveTypePropertiesXmlDTO,
          useValue: leaveTypePropertiesXmlDTOStub
        }
      ]
    }).compile();
    service = await module.get<ProratedDateCurrentMonthService>(ProratedDateCurrentMonthService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
