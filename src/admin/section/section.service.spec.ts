import { Test } from '@nestjs/testing';
import { HttpService } from '@nestjs/common';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { SectionService } from './section.service';
import { SectionModel } from './model/section.model';
import { Resource } from 'src/common/model/resource.model';
describe('SectionService', () => {
  let service: SectionService;
  let queryService: QueryParserService;
  let httpService: HttpService;
  beforeEach(async () => {
    const httpServiceStub = { get: url1 => ({}) };
    const queryParserServiceStub = {
      generateDbQuery: (arg1, fields2, filters3) => ({}),
      generateDbQueryV2: (arg1, fields2, filters3, fields4) => ({})
    };
    const serviceStub = {
      findAll:(fields1)=>({}),
      findById:(fiedls1,fields2)=>({}),
      create:(fields1,fields2)=>({}),
      update:(fields1,fields2)=>({}),
      createProcess:(fields1,fields2,fields3) => ({})
    }
    const module = await Test.createTestingModule({
      providers: [
        SectionService,
        { provide: HttpService, useValue: httpServiceStub },
        { provide: QueryParserService, useValue: queryParserServiceStub }
      ]
    }).compile();
    service = await module.get<SectionService>(SectionService);
    queryService = await module.get<QueryParserService>(QueryParserService);
    httpService = await module.get<HttpService>(HttpService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('findAll', () => {
    it('queryparser is called to generate db query',()=>{
      const queryParserServiceStub: QueryParserService = queryService;// Test.get(QueryParserService);
      spyOn(queryParserServiceStub, 'generateDbQuery').and.callThrough();
      expect(queryParserServiceStub.generateDbQuery).not.toHaveBeenCalled();
      service.findAll('tenanttest');
      expect(queryParserServiceStub.generateDbQuery).toHaveBeenCalled();
    })

    it('get http is called to get response from query',()=>{
      const httpServiceStub: HttpService = httpService;// Test.get(HttpService);
      spyOn(httpServiceStub, 'get').and.callThrough();
      expect(httpServiceStub.get).not.toHaveBeenCalled();
      service.findAll('tenanttest');
      expect(httpServiceStub.get).toHaveBeenCalled();
    })

  });

  describe('findById', () => {
    it('queryparser is called to execute db query',()=>{
      const queryParserServiceStub: QueryParserService = queryService;// Test.get(QueryParserService);
      spyOn(queryParserServiceStub, 'generateDbQuery').and.callThrough();
      expect(queryParserServiceStub.generateDbQuery).not.toHaveBeenCalled();
      service.findById('tenantguid','sectionguid');
      expect(queryParserServiceStub.generateDbQuery).toHaveBeenCalled();
    })

    it('get http is called to grab response from query',()=>{
      const httpServiceStub: HttpService = httpService;// Test.get(HttpService);
      spyOn(httpServiceStub, 'get').and.callThrough();
      expect(httpServiceStub.get).not.toHaveBeenCalled();
      service.findById('tenantguid','sectionguid');
      expect(httpServiceStub.get).toHaveBeenCalled();
    })

  });

  // describe('create', () => {
  //   it('createProcess is called to execute create query',()=>{
  //     const data = new SectionModel();
  //     data.CREATION_USER_GUID = 'testuserguid';
  //     data.ACTIVE_FLAG = 1;
  //     data.NAME = 'nametest';

  //     const resource = new Resource(new Array);
      
  //     resource.resource.push(data);
  //     // service.createProcess = jest.fn().mockResolvedValue('someValue');
  //     // const serviceStub: SectionService = service;// Test.get(QueryParserService);
  //     // spyOn(queryParserServiceStub, 'generateDbQuery').and.callThrough();
     
  //     // const mockData3 = {
  //     //   CREATION_TS : '2019-01-01',
  //     //   CREATION_USER_GUID : 'testuserguid',
  //     //   ACTIVE_FLAG : 1,
  //     //   NAME : 'nametest',
  //     // }
  //     const temp = queryService.generateDbQueryV2 = jest.fn(); //.mockResolvedValue('someValue'); // ('da','da','das','das').mockRe
  //     temp.mockResolvedValue('someValue');
  //     const tempHttp = httpService.post = jest.fn();
  //     tempHttp.mockResolvedValue('someValue');
  //     // expect(service.createByModel(resource,[],[],[])).not.toHaveBeenCalled();
  //     service.create('tenantguid','sectionguid');
  //     // expect(service.createProcess('data1','data2',data)).toHaveBeenCalled();
  //     expect(service.createByModel).toHaveBeenCalled();
      
  //   })

  // });

});
