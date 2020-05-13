import { Test } from '@nestjs/testing';
import { UserService } from 'src/admin/user/user.service';
import { UserInfoService } from 'src/admin/user-info/user-info.service';
import { UserImportService } from '../../../src/api/userimport/user-import.service';
import { PendingLeaveService } from 'src/admin/approval-override/pending-leave.service';
import { UserprofileDbService } from 'src/api/userprofile/db/userprofile.db.service';
import { CompanyDbService } from 'src/admin/company/company.service';
import { LeavetypeService } from 'src/admin/leavetype/leavetype.service';
import { HttpService } from '@nestjs/common';
import { QueryParserService } from '../../../src/common/helper/query-parser.service';
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
    const httpServiceStub = {
      get: url1 => ({
        subscribe: () => ({})
      })
    };
    const module = await Test.createTestingModule({
      providers: [
        UserImportService,
        { provide: UserService, useValue: userServiceStub },
        { provide: UserInfoService, useValue: userInfoServiceStub },
        PendingLeaveService,
        UserprofileDbService,
        CompanyDbService,
        LeavetypeService,
        {
          provide: HttpService,
          useValue: httpServiceStub
        },
        QueryParserService
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
