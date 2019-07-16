import { Test } from '@nestjs/testing';
import { HttpService } from '@nestjs/common';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { SectionService } from '../section/section.service';
import { CostcentreService } from './costcentre.service';
describe('CostcentreService', () => {
  let service: CostcentreService;
  beforeEach(async () => {
    const httpServiceStub = { get: url1 => ({}) };
    const queryParserServiceStub = {
      generateDbQueryV2: (arg1, fields2, filters3, array4) => ({})
    };
    const sectionServiceStub = { createProcess: (user1, name2, data3) => ({}) };
    const module = await Test.createTestingModule({
      providers: [
        CostcentreService,
        { provide: HttpService, useValue: httpServiceStub },
        { provide: QueryParserService, useValue: queryParserServiceStub },
        { provide: SectionService, useValue: sectionServiceStub }
      ]
    }).compile();
    service = await module.get<CostcentreService>(CostcentreService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
