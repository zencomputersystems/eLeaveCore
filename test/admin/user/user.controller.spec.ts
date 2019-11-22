import { Test } from '@nestjs/testing';
import { UserController } from '../../../src/admin/user/user.controller';
describe('UserController', () => {
  let pipe: UserController;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UserController]
    }).compile();
    pipe = await module.get<UserController>(UserController);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
