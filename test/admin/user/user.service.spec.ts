import { Test } from '@nestjs/testing';
import { HttpService } from '@nestjs/common';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { UserService } from '../../../src/admin/user/user.service';
describe('UserService', () => {
  let service: UserService;
  beforeEach(async () => {
    const httpServiceStub = { get: url1 => ({ toPromise: () => ({}) }) };
    const queryParserServiceStub = {
      generateDbQuery: (arg1, fields2, filters3) => ({})
    };
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: HttpService, useValue: httpServiceStub },
        { provide: QueryParserService, useValue: queryParserServiceStub }
      ]
    }).compile();
    service = await module.get<UserService>(UserService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
