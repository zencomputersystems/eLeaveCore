import { Test } from '@nestjs/testing';
import { HttpService } from '@nestjs/common';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { UserInfoDbService } from '../../../src/admin/holiday/db/user-info.db.service';
describe('UserInfoDbService', () => {
  let service: UserInfoDbService;
  beforeEach(async () => {
    const httpServiceStub = {};
    const queryParserServiceStub = {};
    const module = await Test.createTestingModule({
      providers: [
        UserInfoDbService,
        { provide: HttpService, useValue: httpServiceStub },
        { provide: QueryParserService, useValue: queryParserServiceStub }
      ]
    }).compile();
    service = await module.get<UserInfoDbService>(UserInfoDbService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
