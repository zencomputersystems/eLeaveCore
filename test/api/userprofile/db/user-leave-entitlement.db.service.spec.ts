import { Test } from '@nestjs/testing';
import { HttpService } from '@nestjs/common';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { UserLeaveEntitlementDbService } from '../../../../src/api/userprofile/db/user-leave-entitlement.db.service';
describe('UserLeaveEntitlementDbService', () => {
  let service: UserLeaveEntitlementDbService;
  beforeEach(async () => {
    const httpServiceStub = {};
    const queryParserServiceStub = {};
    const module = await Test.createTestingModule({
      providers: [
        UserLeaveEntitlementDbService,
        { provide: HttpService, useValue: httpServiceStub },
        { provide: QueryParserService, useValue: queryParserServiceStub }
      ]
    }).compile();
    service = await module.get<UserLeaveEntitlementDbService>(UserLeaveEntitlementDbService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
