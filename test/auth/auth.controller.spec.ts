import { Test } from '@nestjs/testing';
import { AuthService } from '../../src/auth/auth.service';
import { LoginDto } from '../../src/auth/dto/login.dto';
import { AuthController } from '../../src/auth/auth.controller';
import { ProfileDefaultDbService } from 'src/admin/profile-default/profile-default.db.service';
import { HttpService } from '@nestjs/common';
import { QueryParserService } from '../../src/common/helper/query-parser.service';
describe('AuthController', () => {
  let pipe: AuthController;
  const httpServiceStub = {
    get: url1 => ({
      subscribe: () => ({})
    })
  };
  beforeEach(async () => {
    const authServiceStub = { createToken: arg1 => ({}) };
    const loginDtoStub = {};
    const module = await Test.createTestingModule({
      providers: [
        AuthController,
        { provide: AuthService, useValue: authServiceStub },
        { provide: LoginDto, useValue: loginDtoStub },
        ProfileDefaultDbService,
        {
          provide: HttpService,
          useValue: httpServiceStub
        },
        QueryParserService
      ]
    }).compile();
    pipe = await module.get<AuthController>(AuthController);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
