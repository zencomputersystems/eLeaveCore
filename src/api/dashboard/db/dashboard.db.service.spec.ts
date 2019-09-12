import { DashboardDbService } from './dashboard.db.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { Test } from '@nestjs/testing';

describe('DashboardDbService', () => {
  let dashboardDbService: DashboardDbService;
  let commonFunctionService: CommonFunctionService;
  beforeEach(async () => {

    const dashboardDbServiceStub = { findAllPendingLeave: arg1 => ({}) };
    const commonFunctionServiceStub = { getListData: arg1 => ({}) };
    const module = await Test.createTestingModule({
      providers: [
        { provide: DashboardDbService, useValue: dashboardDbServiceStub },
        { provide: CommonFunctionService, useValue: commonFunctionServiceStub }
      ]
    }).compile();
    dashboardDbService = await module.get<DashboardDbService>(DashboardDbService);
    commonFunctionService = await module.get<CommonFunctionService>(CommonFunctionService);
  });
  it('can load instance', () => {
    expect(dashboardDbService).toBeTruthy();
  });

});