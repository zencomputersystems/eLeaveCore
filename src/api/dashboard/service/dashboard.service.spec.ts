import { DashboardService } from './dashboard.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { Test } from '@nestjs/testing';

describe('DashboardService', () => {
  let dashboardService: DashboardService;
  let commonFunctionService: CommonFunctionService;
  beforeEach(async () => {

    const dashboardServiceStub = { findAllPendingLeave: arg1 => ({}) };
    const commonFunctionServiceStub = { getListData: arg1 => ({}) };
    const module = await Test.createTestingModule({
      providers: [
        { provide: DashboardService, useValue: dashboardServiceStub },
        { provide: CommonFunctionService, useValue: commonFunctionServiceStub }
      ]
    }).compile();
    dashboardService = await module.get<DashboardService>(DashboardService);
    commonFunctionService = await module.get<CommonFunctionService>(CommonFunctionService);
  });
  it('can load instance', () => {
    expect(dashboardService).toBeTruthy();
  });

});