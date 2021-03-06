import { Test } from '@nestjs/testing';
import { UserprofileService } from '../../../../src/api/userprofile/service/userprofile.service';
import { AccessLevelValidateService } from 'src/common/helper/access-level-validate.service';
import { UserprofileController } from '../../../../src/api/userprofile/controller/userprofile/userprofile.controller';
import { UserprofileAssignerService } from '../../../../src/api/userprofile/service/userprofile-assigner.service';
import { CommonFunctionService } from '../../../../src/common/helper/common-function.services';
import { UserInfoDbService } from 'src/admin/holiday/db/user-info.db.service';
import { UserProfileStatusService } from '../../../../src/api/userprofile/service/userprofile-status.service';
import { UserService } from 'src/admin/user/user.service';
import { HttpService, HttpModule } from '@nestjs/common';
import { QueryParserService } from 'src/common/helper/query-parser.service';
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
    const userprofileAssignerServiceStub = {

    }
    const userInfoDbServiceStub = {

    }
    const userProfileStatusServiceStub = {}
    const module = await Test.createTestingModule({
      providers: [
        UserprofileController,
        { provide: UserprofileService, useValue: userprofileServiceStub },
        {
          provide: AccessLevelValidateService,
          useValue: accessLevelValidateServiceStub
        },
        {
          provide: UserprofileAssignerService,
          useValue: userprofileAssignerServiceStub
        },
        CommonFunctionService,
        {
          provide: UserInfoDbService,
          useValue: userInfoDbServiceStub
        },
        {
          provide: UserProfileStatusService,
          useValue: userProfileStatusServiceStub
        },
        UserService,
        QueryParserService
      ],
      imports: [HttpModule]
    }).compile();
    pipe = await module.get<UserprofileController>(UserprofileController);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
