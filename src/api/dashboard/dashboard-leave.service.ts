import { Injectable } from '@nestjs/common';
import { UserLeaveEntitlementSummaryDbService } from '../userprofile/db/user-leave-summary.db.service';
import { UserLeaveEntitlementDbService } from '../userprofile/db/user-leave-entitlement.db.service';

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
    private readonly userLeaveEntitlementSummaryDbService: UserLeaveEntitlementSummaryDbService,
    private readonly userLeaveEntitlementDbService: UserLeaveEntitlementDbService
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

  /**
   * Get replacement leave 
   *
   * @param {string} userGuid
   * @returns
   * @memberof DashboardLeaveService
   */
  public getReplacementLeave(userGuid: string) {
    let replacementLeaveId = 'aa84b3c0-7849-11e9-a449-bd6134fe73e4';

    const field = [
      'USER_LEAVE_ENTITLEMENT_GUID',
      'ENTITLEMENT_GUID',
      'YEAR',
      'DAYS_ADDED',
      'CF_FLAG',
      'PARENT_FLAG',
      'EXPIREDATE',
      'REMARKS'
    ];
    const filter = ['(USER_GUID=' + userGuid + ')', '(LEAVE_TYPE_GUID=' + replacementLeaveId + ')'];
    return this.userLeaveEntitlementDbService.findByFilterV2(field, filter);
  }

}