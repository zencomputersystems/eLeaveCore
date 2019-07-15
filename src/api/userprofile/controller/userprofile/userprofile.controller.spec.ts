import { Test } from '@nestjs/testing';
import { UserprofileService } from '../../service/userprofile.service';
import { AccessLevelValidateService } from 'src/common/helper/access-level-validate.service';
import { UserprofileController } from './userprofile.controller';
describe('UserprofileController', () => {
  let pipe: UserprofileController;
  beforeEach(async () => {
    const userprofileServiceStub = {
      getList: filter1 => ({}),
      getDetail: filter1 => ({ subscribe: () => ({}) }),
      getEntitlementDetail: (arg1, arg2) => ({ subscribe: () => ({}) })
    };
    const accessLevelValidateServiceStub = {
      generateFilterWithChecking: (arg1, arg2, arg3, array4) => ({
        pipe: () => ({ subscribe: () => ({}) })
      })
    };
    const module = await Test.createTestingModule({
      providers: [
        UserprofileController,
        { provide: UserprofileService, useValue: userprofileServiceStub },
        {
          provide: AccessLevelValidateService,
          useValue: accessLevelValidateServiceStub
        }
      ]
    }).compile();
    pipe = await module.get<UserprofileController>(UserprofileController);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
