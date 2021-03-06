import { Test } from '@nestjs/testing';
import { HttpService } from '@nestjs/common';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { HolidayDbService } from '../../../src/admin/holiday/db/holiday.db.service';
describe('HolidayDbService', () => {
  let service: HolidayDbService;
  let httpService: HttpService;
  let queryService: QueryParserService;
  beforeEach(async () => {
    const httpServiceStub = { get: url1 => ({}) };
    const queryParserServiceStub = {
      generateDbQueryV2: (arg1, fields2, filters3, array4) => ({})
    };
    const module = await Test.createTestingModule({
      providers: [
        HolidayDbService,
        { provide: HttpService, useValue: httpServiceStub },
        { provide: QueryParserService, useValue: queryParserServiceStub }
      ]
    }).compile();
    service = await module.get<HolidayDbService>(HolidayDbService);
    httpService = await module.get<HttpService>(HttpService);
    queryService = await module.get<QueryParserService>(QueryParserService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
  describe('findAllProfile', () => {
    it('makes expected calls', () => {
      const httpServiceStub: HttpService = httpService;// Test.get(HttpService);
      const queryParserServiceStub: QueryParserService = queryService;// Test.get(QueryParserService);
      spyOn(httpServiceStub, 'get').and.callThrough();
      spyOn(queryParserServiceStub, 'generateDbQueryV2').and.callThrough();
      service.findAllProfile();
      expect(httpServiceStub.get).toHaveBeenCalled();
      expect(queryParserServiceStub.generateDbQueryV2).toHaveBeenCalled();
    });
  });
});
