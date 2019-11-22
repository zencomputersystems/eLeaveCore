import { Test } from '@nestjs/testing';
import { HttpService } from '@nestjs/common';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { UserprofileDbService } from '../../../../src/api/userprofile/db/userprofile.db.service';
describe('UserprofileDbService', () => {
  let service: UserprofileDbService;
  beforeEach(async () => {
    const httpServiceStub = {};
    const queryParserServiceStub = {};
    const module = await Test.createTestingModule({
      providers: [
        UserprofileDbService,
        { provide: HttpService, useValue: httpServiceStub },
        { provide: QueryParserService, useValue: queryParserServiceStub }
      ]
    }).compile();
    service = await module.get<UserprofileDbService>(UserprofileDbService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
