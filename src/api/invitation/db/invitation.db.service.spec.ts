import { Test } from '@nestjs/testing';
import { HttpService } from '@nestjs/common';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { InvitationDbService } from './invitation.db.service';
describe('InvitationDbService', () => {
  let service: InvitationDbService;
  beforeEach(async () => {
    const httpServiceStub = { get: url1 => ({}) };
    const queryParserServiceStub = {
      generateDbQuery: (arg1, fields2, filters3) => ({})
    };
    const module = await Test.createTestingModule({
      providers: [
        InvitationDbService,
        { provide: HttpService, useValue: httpServiceStub },
        { provide: QueryParserService, useValue: queryParserServiceStub }
      ]
    }).compile();
    // service = Test.get(InvitationDbService);
    service = await module.get<InvitationDbService>(InvitationDbService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
