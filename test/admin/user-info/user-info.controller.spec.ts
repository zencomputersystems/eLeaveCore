import { Test } from '@nestjs/testing';
import { UserInfoService } from '../../../src/admin/user-info/user-info.service';
import { CreateUserDTO } from '../../../src/admin/user-info/dto/create-user.dto';
import { UpdateUserDTO } from '../../../src/admin/user-info/dto/update-user.dto';
import { UserInfoController } from '../../../src/admin/user-info/user-info.controller';
describe('UserInfoController', () => {
  let pipe: UserInfoController;
  beforeEach(async () => {
    const userInfoServiceStub = {
      create: (arg1, createUserDTO2) => ({}),
      update: (arg1, updateUserDTO2) => ({}),
      findOne: (userguid1, tenantguid2) => ({ subscribe: () => ({}) })
    };
    const createUserDTOStub = {};
    const updateUserDTOStub = {};
    const module = await Test.createTestingModule({
      providers: [
        UserInfoController,
        { provide: UserInfoService, useValue: userInfoServiceStub },
        { provide: CreateUserDTO, useValue: createUserDTOStub },
        { provide: UpdateUserDTO, useValue: updateUserDTOStub }
      ]
    }).compile();
    // pipe = Test.get(UserInfoController);
    pipe = await module.get<UserInfoController>(UserInfoController);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
