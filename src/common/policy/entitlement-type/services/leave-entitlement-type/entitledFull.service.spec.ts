import { Test } from '@nestjs/testing';
import { XMLParserService } from 'src/common/helper/xml-parser.service';
import { LeaveTypePropertiesXmlDTO } from 'src/admin/leavetype-entitlement/dto/xml/leavetype-properties.xml.dto';
import { EntitledFullService } from './entitledFull.service';
describe('EntitledFullService', () => {
  let service: EntitledFullService;
  beforeEach(async() => {
    const xMLParserServiceStub = {};
    const leaveTypePropertiesXmlDTOStub = {};
    const module = await Test.createTestingModule({
      providers: [
        EntitledFullService,
        { provide: XMLParserService, useValue: xMLParserServiceStub },
        {
          provide: LeaveTypePropertiesXmlDTO,
          useValue: leaveTypePropertiesXmlDTOStub
        }
      ]
    }).compile();
    service = await module.get<EntitledFullService>(EntitledFullService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
