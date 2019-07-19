import { Test } from '@nestjs/testing';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { HttpService } from '@nestjs/common';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { DepartmentDbService } from '../department/db/department.db.service';
describe('CompanyController', () => {
  let pipe: CompanyController;
  beforeEach(async () => {
    const httpServiceStub = { get: url1 => ({}) };
    const queryParserServiceStub = {
      generateDbQueryV2: (arg1, fields2, filters3, array4) => ({})
    };
    const module = await Test.createTestingModule({
      providers: [CompanyController, CompanyService,
        { provide: HttpService, useValue: httpServiceStub },
        { provide: QueryParserService, useValue: queryParserServiceStub },
        CommonFunctionService,
        DepartmentDbService]
    }).compile();
    pipe = await module.get<CompanyController>(CompanyController);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
