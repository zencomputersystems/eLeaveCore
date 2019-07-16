import { Test } from '@nestjs/testing';
import { HttpService } from '@nestjs/common';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { DepartmentDbService } from './department.db.service';
describe('DepartmentDbService', () => {
  let service: DepartmentDbService;
  beforeEach(async () => {
    const httpServiceStub = {};
    const queryParserServiceStub = {};
    const commonFunctionServiceStub = {
      findAllList: (fields1, tenantid2, arg3, arg4, arg5) => ({})
    };
    const module = await Test.createTestingModule({
      providers: [
        DepartmentDbService,
        { provide: HttpService, useValue: httpServiceStub },
        { provide: QueryParserService, useValue: queryParserServiceStub },
        { provide: CommonFunctionService, useValue: commonFunctionServiceStub }
      ]
    }).compile();
    service = await module.get<DepartmentDbService>(DepartmentDbService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
