import { Test } from '@nestjs/testing';
import { UserService } from 'src/admin/user/user.service';
import { UserInfoService } from 'src/admin/user-info/user-info.service';
import { UserImportService } from './user-import.service';
describe('UserImportService', () => {
  let service: UserImportService;
  beforeEach(async () => {
    const userServiceStub = {
      findByFilterV2: (array1, array2) => ({ pipe: () => ({}) }),
      createByModel: (userResourceArray1, array2, array3, array4) => ({
        pipe: () => ({})
      })
    };
    const userInfoServiceStub = {
      createByModel: (userInfoResourceArray1, array2, array3, array4) => ({
        pipe: () => ({})
      })
    };
    const module = await Test.createTestingModule({
      providers: [
        UserImportService,
        { provide: UserService, useValue: userServiceStub },
        { provide: UserInfoService, useValue: userInfoServiceStub }
      ]
    }).compile();
    // service = Test.get(UserImportService);
    service = await module.get<UserImportService>(UserImportService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
  it('importResult defaults to: []', () => {
    expect(service.importResult).toEqual([]);
  });
});
