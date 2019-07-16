import { Test } from '@nestjs/testing';
import { HttpService } from '@nestjs/common';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { XMLParserService } from 'src/common/helper/xml-parser.service';
import { ApplyLeaveDataDTO } from '../dto/apply-leave-data.dto';
import { ApplyLeaveDTO } from '../dto/apply-leave.dto';
import { DateCalculationService } from 'src/common/calculation/service/date-calculation.service';
import { LeaveTransactionDbService } from './leave-transaction.db.service';
describe('LeaveTransactionDbService', () => {
  let service: LeaveTransactionDbService;
  beforeEach(async () => {
    const httpServiceStub = {};
    const queryParserServiceStub = {};
    const xMLParserServiceStub = { convertJsonToXML: arg1 => ({}) };
    const applyLeaveDataDTOStub = {
      startDate: {},
      endDate: {},
      dayType: {},
      slot: {}
    };
    const applyLeaveDTOStub = { reason: {} };
    const dateCalculationServiceStub = {
      getLeaveDuration: (arg1, arg2, arg3, arg4, arg5) => ({})
    };
    const module = await Test.createTestingModule({
      providers: [
        LeaveTransactionDbService,
        { provide: HttpService, useValue: httpServiceStub },
        { provide: QueryParserService, useValue: queryParserServiceStub },
        { provide: XMLParserService, useValue: xMLParserServiceStub },
        { provide: ApplyLeaveDataDTO, useValue: applyLeaveDataDTOStub },
        { provide: ApplyLeaveDTO, useValue: applyLeaveDTOStub },
        {
          provide: DateCalculationService,
          useValue: dateCalculationServiceStub
        }
      ]
    }).compile();
    service = await module.get<LeaveTransactionDbService>(LeaveTransactionDbService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
