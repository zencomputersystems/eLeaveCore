import { Injectable } from '@nestjs/common';
import { UserLeaveEntitlementSummaryDbService } from '../userprofile/db/user-leave-summary.db.service';
import { UserLeaveEntitlementDbService } from '../userprofile/db/user-leave-entitlement.db.service';
import { of, Observable } from 'rxjs';

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

  public getMyLeave([leavecode, type, userguid]) {
    let results: Observable<any>;
    let method; // First array is for simple, second array for detailed
    let leavetypeguid;

    if (leavecode == 'ANL') {
      // Annual Leave (ANL)
      leavetypeguid = '238fc8fa-6e70-fa83-7c9b-17f77108b691';
      method = [this.getSimple([leavetypeguid, userguid]), this.getDetailed([leavecode, userguid])];
    }
    if (leavecode == 'BDL') {
      // Birthday Leave (BDL)
      leavetypeguid = '6c4df920-ad02-11e9-9fd9-4bbcd4683180';
      method = [this.getSimple([leavetypeguid, userguid]), this.getDetailed([leavecode, userguid])];
    }
    if (leavecode == 'CPL') {
      // Compassionate Leave (CPL)
      leavetypeguid = '79748eee-a339-f6c7-b7e2-1d2234fa37ba';
      method = [this.getSimple([leavetypeguid, userguid]), this.getDetailed([leavecode, userguid])];
    }
    if (leavecode == 'HPL') {
      // Hospitalization Leave (HPL)
      leavetypeguid = '85747738-66bf-8cb1-768a-d73319c61759';
      method = [this.getSimple([leavetypeguid, userguid]), this.getDetailed([leavecode, userguid])];
    }
    if (leavecode == 'MDL') {
      // Medical Leave (MDL)
      leavetypeguid = '952f7a50-3e60-11e9-9120-e18c2da081f3';
      method = [this.getSimple([leavetypeguid, userguid]), this.getDetailed([leavecode, userguid])];
    }
    if (leavecode == 'PTL') {
      // Paternity Leave (PTL)
      leavetypeguid = 'a534ece0-a6a3-11e9-bf53-01cecf40aca5';
      method = [this.getSimple([leavetypeguid, userguid]), this.getDetailed([leavecode, userguid])];
    }
    if (leavecode == 'RPL') {
      // Replacement Leave (RPL)
      leavetypeguid = 'aa84b3c0-7849-11e9-a449-bd6134fe73e4';
      method = [this.getSimple([leavetypeguid, userguid]), this.getReplacementLeave(userguid)];
    }
    if (leavecode == 'MTL') {
      // Maternity Leave (MTL)
      leavetypeguid = 'de630fa0-be3c-11e9-aba8-fbb0196d9a2c';
      method = [this.getSimple([leavetypeguid, userguid]), this.getDetailed([leavecode, userguid])];
    }
    if (leavecode == 'MRL') {
      // Marriage Leave (MRL)
      leavetypeguid = 'fb893a8c-7e49-a34b-e208-e57a615e004c';
      method = [this.getSimple([leavetypeguid, userguid]), this.getDetailed([leavecode, userguid])];
    }


    results = this.doProcess([type, method]);

    return results;
  }
  public doProcess([type, method]) {
    let results = type == 'simple' ? method[0] : method[1];
    return results;
  }

  public getSimple([leaveguid, userguid]) {
    const filter = ['(USER_GUID=' + userguid + ')', '(YEAR=' + new Date().getFullYear() + ')', '(LEAVE_TYPE_GUID=' + leaveguid + ')'];
    return this.userLeaveEntitlementSummaryDbService.findByFilterV2([], filter);
  }

  public getDetailed([leavecode, userguid]) {
    return of('Data details not ready for ' + leavecode + ' ' + userguid);
  }

}