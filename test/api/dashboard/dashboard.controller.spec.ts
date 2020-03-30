import { Test } from '@nestjs/testing';
import { HttpService } from '@nestjs/common';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { DashboardController } from '../../../src/api/dashboard/controller/dashboard.controller';
import { XMLParserService } from '../../../src/common/helper/xml-parser.service';
import { DashboardService } from '../../../src/api/dashboard/service/dashboard.service';
import { DashboardLeaveService } from '../../../src/api/dashboard/service/dashboard-leave.service';
import { PendingLeaveService } from '../../../src/admin/approval-override/pending-leave.service';
import { UserprofileDbService } from '../../../src/api/userprofile/db/userprofile.db.service';
import { CompanyDbService } from 'src/admin/company/company.service';
import { LeavetypeService } from 'src/admin/leavetype/leavetype.service';
import { QueryParserService } from '../../../src/common/helper/query-parser.service';
describe('DashboardController', () => {
  let pipe: DashboardController;
  beforeEach(async () => {
    const httpServiceStub = {
      get: url1 => ({
        subscribe: () => ({})
      })
    };
    const commonFunctionServiceStub = {
      sendResSuccessV2: (data1, res2) => ({}),
      sendResErrorV3: (err1, res2) => ({})
    };
    const DashboardServiceStub = {}
    const DashboardLeaveServiceStub = {}

    const module = await Test.createTestingModule({
      providers: [
        DashboardController,
        {
          provide: HttpService,
          useValue: httpServiceStub
        },
        {
          provide: CommonFunctionService,
          useValue: commonFunctionServiceStub
        },
        XMLParserService,
        {
          provide: DashboardService,
          useValue: DashboardServiceStub
        },
        {
          provide: DashboardLeaveService,
          useValue: DashboardLeaveServiceStub
        },
        PendingLeaveService,
        UserprofileDbService,
        CompanyDbService,
        LeavetypeService,
        QueryParserService
      ]
    }).compile();
    pipe = await module.get<DashboardController>(DashboardController);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
