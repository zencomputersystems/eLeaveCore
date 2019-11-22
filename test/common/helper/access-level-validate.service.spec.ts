import { Test } from '@nestjs/testing';
import { UserInfoService } from 'src/admin/user-info/user-info.service';
import { AccessLevelValidateService } from '../../../src/common/helper/access-level-validate.service';
describe('AccessLevelValidateService', () => {
  let service: AccessLevelValidateService;
  beforeEach(async () => {
    const userInfoServiceStub = {
      findByFilterV2: (filterLevel1, filter2) => ({ pipe: () => ({}) })
    };
    const module = await Test.createTestingModule({
      providers: [
        AccessLevelValidateService,
        { provide: UserInfoService, useValue: userInfoServiceStub }
      ]
    }).compile();
    service = await module.get<AccessLevelValidateService>(AccessLevelValidateService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
