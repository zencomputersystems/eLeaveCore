import { Test } from '@nestjs/testing';
import { HttpService } from '@nestjs/common';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { CompanyService, CompanyDbService } from '../../../src/admin/company/company.service';
import { CommonFunctionService } from '../../../src/common/helper/common-function.services';
import { UserInfoDbService } from 'src/admin/holiday/db/user-info.db.service';
import { UserprofileDbService } from '../../../src/api/userprofile/db/userprofile.db.service';
describe('CompanyService', () => {
  let service: CompanyService;
  beforeEach(async () => {
    const httpServiceStub = { get: url1 => ({}) };
    const queryParserServiceStub = {
      generateDbQueryV2: (arg1, fields2, filters3, array4) => ({})
    };
    const module = await Test.createTestingModule({
      providers: [
        CompanyService,
        { provide: HttpService, useValue: httpServiceStub },
        { provide: QueryParserService, useValue: queryParserServiceStub },
        CommonFunctionService,
        CompanyDbService,
        UserInfoDbService,
        UserprofileDbService
      ]
    }).compile();
    service = await module.get<CompanyService>(CompanyService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
