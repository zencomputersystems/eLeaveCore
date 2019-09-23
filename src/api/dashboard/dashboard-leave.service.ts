import { Injectable } from '@nestjs/common';
import { UserLeaveEntitlementSummaryDbService } from '../userprofile/db/user-leave-summary.db.service';

/**
 * Service for dashboard leave
 *
 * @export
 * @class DashboardLeaveService
 */
@Injectable()
export class DashboardLeaveService {

  /**
   *Creates an instance of DashboardLeaveService.
   * @param {UserLeaveEntitlementSummaryDbService} userLeaveEntitlementSummaryDbService
   * @memberof DashboardLeaveService
   */
  constructor(
    private readonly userLeaveEntitlementSummaryDbService: UserLeaveEntitlementSummaryDbService
  ) { }

  /**
   * Get annual leave
   *
   * @param {string} userGuid
   * @returns
   * @memberof DashboardLeaveService
   */
  public getAnnualLeave(userGuid: string) {
    let annualLeaveId = '238fc8fa-6e70-fa83-7c9b-17f77108b691';
    const field = [];
    const filter = ['(USER_GUID=' + userGuid + ')', '(YEAR=' + new Date().getFullYear() + ')', '(LEAVE_TYPE_GUID=' + annualLeaveId + ')'];
    return this.userLeaveEntitlementSummaryDbService.findByFilterV2(field, filter);
  }

  /**
   * Get medical leave
   *
   * @param {string} userGuid
   * @returns
   * @memberof DashboardLeaveService
   */
  public getMedicalLeave(userGuid: string) {
    let medicalLeaveId = '952f7a50-3e60-11e9-9120-e18c2da081f3';
    const field = [];
    const filter = ['(USER_GUID=' + userGuid + ')', '(YEAR=' + new Date().getFullYear() + ')', '(LEAVE_TYPE_GUID=' + medicalLeaveId + ')'];
    return this.userLeaveEntitlementSummaryDbService.findByFilterV2(field, filter);
  }

}