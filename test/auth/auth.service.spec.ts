import { Test } from '@nestjs/testing';
import { UserService } from 'src/admin/user/user.service';
import { AuthService } from '../../src/auth/auth.service';
import { AuthDbService } from '../../src/auth/auth.db.service';
import { HttpService } from '@nestjs/common';
import { QueryParserService } from '../../src/common/helper/query-parser.service';
describe('AuthService', () => {
  let service: AuthService;
  beforeEach(async () => {
    const userServiceStub = {
      findOne: (email1, password2) => ({ then: () => ({}) }),
      findByFilterV2: (array1, array2) => ({
        toPromise: () => ({ then: () => ({}) })
      }),
      findOneByPayload: payload1 => ({ then: () => ({}) })
    };
    const httpServiceStub = {
      get: url1 => ({
        subscribe: () => ({})
      })
    };
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        AuthDbService,
        { provide: UserService, useValue: userServiceStub },
        HttpService, {
          provide: HttpService,
          useValue: httpServiceStub
        },
        QueryParserService
      ]
    }).compile();
    service = await module.get<AuthService>(AuthService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
