import { Test } from '@nestjs/testing';
import { UserprofileService } from '../../../../src/api/userprofile/service/userprofile.service';
import { AccessLevelValidateService } from 'src/common/helper/access-level-validate.service';
import { UpdatePersonalDetailDTO } from '../../../../src/api/userprofile/dto/userprofile-detail/personal-detail/update-personal-detail.dto';
import { XMLParserService } from 'src/common/helper/xml-parser.service';
import { PersonalDetailController } from '../../../../src/api/userprofile/controller/personal-detail/personal-detail.controller';
import { CommonFunctionService } from '../../../../src/common/helper/common-function.services';
import { HttpService } from '@nestjs/common';
import { QueryParserService } from '../../../../src/common/helper/query-parser.service';
import { UserInfoDetailsService } from 'src/admin/user-info-details/user-info-details.service';
import { UserInfoDbService } from 'src/admin/holiday/db/user-info.db.service';
import { PendingLeaveService } from 'src/admin/approval-override/pending-leave.service';
import { UserprofileDbService } from '../../../../src/api/userprofile/db/userprofile.db.service';
import { CompanyDbService } from '../../../../src/admin/company/company.service';
import { LeavetypeService } from '../../../../src/admin/leavetype/leavetype.service';
describe('PersonalDetailController', () => {
  let pipe: PersonalDetailController;
  beforeEach(async () => {
    const userprofileServiceStub = {
      getPersonalDetail: filters1 => ({ subscribe: () => ({}) }),
      updatePersonalDetail: (updatePersonalDetailDTO1, arg2) => ({
        subscribe: () => ({})
      })
    };
    const accessLevelValidateServiceStub = {
      generateFilterWithChecking: (arg1, arg2, arg3, array4) => ({
        pipe: () => ({ subscribe: () => ({}) })
      })
    };
    const httpServiceStub = { get: url1 => ({}) };
    const updatePersonalDetailDTOStub = {};
    const xMLParserServiceStub = {};
    const module = await Test.createTestingModule({
      providers: [
        PersonalDetailController,
        { provide: UserprofileService, useValue: userprofileServiceStub },
        {
          provide: AccessLevelValidateService,
          useValue: accessLevelValidateServiceStub
        },
        {
          provide: UpdatePersonalDetailDTO,
          useValue: updatePersonalDetailDTOStub
        },
        { provide: XMLParserService, useValue: xMLParserServiceStub },
        CommonFunctionService,
        { provide: HttpService, useValue: httpServiceStub },
        QueryParserService,
        UserInfoDetailsService,
        UserInfoDbService,
        PendingLeaveService,
        UserprofileDbService,
        CompanyDbService,
        LeavetypeService
      ]
    }).compile();
    // pipe = Test.get(PersonalDetailController);
    pipe = await module.get<PersonalDetailController>(PersonalDetailController);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
