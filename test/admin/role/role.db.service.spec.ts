import { Test } from '@nestjs/testing';
import { HttpService } from '@nestjs/common';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { RoleDbService } from '../../../src/admin/role/db/role.db.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
describe('RoleDbService', () => {
  let service: RoleDbService;
  let httpService: HttpService;
  let queryService: QueryParserService;
  beforeEach(async () => {
    const httpServiceStub = { get: url1 => ({}) };
    const queryParserServiceStub = {
      generateDbQueryV2: (arg1, fields2, filters3, array4) => ({})
    };
    const module = await Test.createTestingModule({
      providers: [
        RoleDbService,
        { provide: HttpService, useValue: httpServiceStub },
        { provide: QueryParserService, useValue: queryParserServiceStub },
        CommonFunctionService
      ]
    }).compile();
    service = await module.get<RoleDbService>(RoleDbService);
    httpService = await module.get<HttpService>(HttpService);
    queryService = await module.get<QueryParserService>(QueryParserService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
  describe('findAllRoleProfile', () => {
    it('makes expected calls', () => {
      const httpServiceStub: HttpService = httpService;// Test.get(HttpService);
      const queryParserServiceStub: QueryParserService = queryService;// Test.get(QueryParserService);
      spyOn(httpServiceStub, 'get').and.callThrough();
      spyOn(queryParserServiceStub, 'generateDbQueryV2').and.callThrough();
      service.findAllRoleProfile();
      expect(httpServiceStub.get).toHaveBeenCalled();
      expect(queryParserServiceStub.generateDbQueryV2).toHaveBeenCalled();
    });
  });
});
