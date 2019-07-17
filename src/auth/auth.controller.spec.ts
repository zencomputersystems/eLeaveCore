import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthController } from './auth.controller';
describe('AuthController', () => {
  let pipe: AuthController;
  beforeEach(async () => {
    const authServiceStub = { createToken: arg1 => ({}) };
    const loginDtoStub = {};
    const module = await Test.createTestingModule({
      providers: [
        AuthController,
        { provide: AuthService, useValue: authServiceStub },
        { provide: LoginDto, useValue: loginDtoStub }
      ]
    }).compile();
    pipe = await module.get<AuthController>(AuthController);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
