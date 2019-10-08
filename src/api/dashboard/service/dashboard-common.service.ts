import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { DashboardService } from './dashboard.service';
import { Injectable } from '@nestjs/common';

/**
 * Service to refaactor constructor - dashboard controller
 *
 * @export
 * @class DashboardCommonService
 */
@Injectable()
export class DashboardCommonService {
  /**
   *Creates an instance of DashboardCommonService.
   * @param {CommonFunctionService} commonFunctionService common function service
   * @param {DashboardService} dashboardService dashboard service
   * @memberof DashboardCommonService
   */
  constructor(
    public commonFunctionService: CommonFunctionService,
    public dashboardService: DashboardService
  ) { }
}