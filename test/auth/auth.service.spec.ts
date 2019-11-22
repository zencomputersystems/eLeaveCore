import { Test } from '@nestjs/testing';
import { UserService } from 'src/admin/user/user.service';
import { AuthService } from '../../src/auth/auth.service';
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
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: userServiceStub }
      ]
    }).compile();
    service = await module.get<AuthService>(AuthService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
