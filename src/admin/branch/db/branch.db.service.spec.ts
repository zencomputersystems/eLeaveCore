import { Test } from '@nestjs/testing';
import { HttpService } from '@nestjs/common';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { BranchDbService } from './branch.db.service';
describe('BranchDbService', () => {
  let service: BranchDbService;
  beforeEach(async () => {
    const httpServiceStub = { get: url1 => ({}) };
    const queryParserServiceStub = {
      generateDbQueryV2: (arg1, fields2, filters3, array4) => ({})
    };
    const commonFunctionServiceStub = {
      findAllList: (fields1, tENANT_GUID2, arg3, arg4, arg5) => ({})
    };
    const module = await Test.createTestingModule({
      providers: [
        BranchDbService,
        { provide: HttpService, useValue: httpServiceStub },
        { provide: QueryParserService, useValue: queryParserServiceStub },
        { provide: CommonFunctionService, useValue: commonFunctionServiceStub }
      ]
    }).compile();
    service = await module.get<BranchDbService>(BranchDbService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
