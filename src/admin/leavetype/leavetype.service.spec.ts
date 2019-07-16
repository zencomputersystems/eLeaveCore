import { Test } from '@nestjs/testing';
import { HttpService } from '@nestjs/common';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { LeavetypeService } from './leavetype.service';
describe('LeavetypeService', () => {
  let service: LeavetypeService;
  beforeEach(async () => {
    const httpServiceStub = { get: url1 => ({}) };
    const queryParserServiceStub = {
      generateDbQuery: (arg1, fields2, filters3) => ({})
    };
    const module = await Test.createTestingModule({
      providers: [
        LeavetypeService,
        { provide: HttpService, useValue: httpServiceStub },
        { provide: QueryParserService, useValue: queryParserServiceStub }
      ]
    }).compile();
    service = await module.get<LeavetypeService>(LeavetypeService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
