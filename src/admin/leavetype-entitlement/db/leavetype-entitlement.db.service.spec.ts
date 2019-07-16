import { Test } from '@nestjs/testing';
import { HttpService } from '@nestjs/common';
import { UpdateLeaveTypeEntitlementDto } from '../dto/update-leavetype_entitlement.dto';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { XMLParserService } from 'src/common/helper/xml-parser.service';
import { CreateLeaveEntitlementTypeDTO } from '../dto/create-leavetype_entitlement.dto';
import { LeavetypeEntitlementDbService } from './leavetype-entitlement.db.service';
describe('LeavetypeEntitlementDbService', () => {
  let service: LeavetypeEntitlementDbService;
  beforeEach(async () => {
    const httpServiceStub = { get: url1 => ({}) };
    const updateLeaveTypeEntitlementDtoStub = {
      id: {},
      code: {},
      description: {},
      properties: {}
    };
    const queryParserServiceStub = {
      generateDbQueryV2: (arg1, array2, filters3, array4) => ({}),
      generateDbQuery: (arg1, fields2, filters3) => ({})
    };
    const xMLParserServiceStub = { convertJsonToXML: arg1 => ({}) };
    const createLeaveEntitlementTypeDTOStub = {
      code: {},
      description: {},
      properties: {},
      leavetype_id: {}
    };
    const module = await Test.createTestingModule({
      providers: [
        LeavetypeEntitlementDbService,
        { provide: HttpService, useValue: httpServiceStub },
        {
          provide: UpdateLeaveTypeEntitlementDto,
          useValue: updateLeaveTypeEntitlementDtoStub
        },
        { provide: QueryParserService, useValue: queryParserServiceStub },
        { provide: XMLParserService, useValue: xMLParserServiceStub },
        {
          provide: CreateLeaveEntitlementTypeDTO,
          useValue: createLeaveEntitlementTypeDTOStub
        }
      ]
    }).compile();
    service = await module.get<LeavetypeEntitlementDbService>(LeavetypeEntitlementDbService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
