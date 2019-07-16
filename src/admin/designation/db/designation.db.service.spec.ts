import { Test } from '@nestjs/testing';
import { HttpService } from '@nestjs/common';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { DesignationDbService } from './designation.db.service';
describe('DesignationDbService', () => {
  let service: DesignationDbService;
  beforeEach(async () => {
    const httpServiceStub = {};
    const queryParserServiceStub = {};
    const commonFunctionServiceStub = {
      findAllList: (fields1, tenantid2, arg3, arg4, arg5) => ({})
    };
    const module = await Test.createTestingModule({
      providers: [
        DesignationDbService,
        { provide: HttpService, useValue: httpServiceStub },
        { provide: QueryParserService, useValue: queryParserServiceStub },
        { provide: CommonFunctionService, useValue: commonFunctionServiceStub }
      ]
    }).compile();
    service = await module.get<DesignationDbService>(DesignationDbService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
