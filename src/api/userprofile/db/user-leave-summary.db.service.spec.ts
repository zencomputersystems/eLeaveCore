import { Test } from '@nestjs/testing';
import { HttpService } from '@nestjs/common';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { UserLeaveEntitlementSummaryDbService } from './user-leave-summary.db.service';
describe('UserLeaveEntitlementSummaryDbService', () => {
  let service: UserLeaveEntitlementSummaryDbService;
  beforeEach(async () => {
    const httpServiceStub = {};
    const queryParserServiceStub = {};
    const module = await Test.createTestingModule({
      providers: [
        UserLeaveEntitlementSummaryDbService,
        { provide: HttpService, useValue: httpServiceStub },
        { provide: QueryParserService, useValue: queryParserServiceStub }
      ]
    }).compile();
    service = await module.get<UserLeaveEntitlementSummaryDbService>(UserLeaveEntitlementSummaryDbService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
