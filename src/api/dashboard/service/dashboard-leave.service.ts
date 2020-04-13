import { Injectable, NotFoundException } from '@nestjs/common';
import { UserLeaveEntitlementSummaryDbService } from '../../userprofile/db/user-leave-summary.db.service';
import { UserLeaveEntitlementDbService } from '../../userprofile/db/user-leave-entitlement.db.service';
import { of, Observable } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import * as moment from 'moment';

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
    let annualLeaveId;
    let filter = ['(USER_GUID=' + userGuid + ')', '(YEAR=' + new Date().getFullYear() + ')', `(ABBR='AL')`];
    return this.userLeaveEntitlementSummaryDbService.findByFilterV2([], filter).pipe(
      mergeMap(
        data => {
          if (data.length > 0) {
            annualLeaveId = data[0].LEAVE_TYPE_GUID;
          } else {
            throw new NotFoundException('Leavetype not found');
          }
          const field = [];
          const filter = ['(USER_GUID=' + userGuid + ')', '(YEAR=' + new Date().getFullYear() + ')', '(LEAVE_TYPE_GUID=' + annualLeaveId + ')'];
          return this.userLeaveEntitlementSummaryDbService.findByFilterV2(field, filter);
        })
    );
  }

  /**
   * Get medical leave
   *
   * @param {string} userGuid
   * @returns
   * @memberof DashboardLeaveService
   */
  public getMedicalLeave(userGuid: string) {
    let medicalLeaveId;

    let filter = ['(USER_GUID=' + userGuid + ')', '(YEAR=' + new Date().getFullYear() + ')', `(ABBR='ML')`];
    return this.userLeaveEntitlementSummaryDbService.findByFilterV2([], filter).pipe(
      mergeMap(
        data => {
          if (data.length > 0) {
            medicalLeaveId = data[0].LEAVE_TYPE_GUID;
          } else {
            throw new NotFoundException('Leavetype not found');
          }

          const field = [];
          const filter = ['(USER_GUID=' + userGuid + ')', '(YEAR=' + new Date().getFullYear() + ')', '(LEAVE_TYPE_GUID=' + medicalLeaveId + ')'];
          return this.userLeaveEntitlementSummaryDbService.findByFilterV2(field, filter);
        })
    );
  }

  /**
   * Get replacement leave 
   *
   * @param {string} userGuid
   * @returns
   * @memberof DashboardLeaveService
   */
  public getReplacementLeave(userGuid: string): Observable<any> {
    let replacementLeaveId;

    let filter = ['(USER_GUID=' + userGuid + ')', '(YEAR=' + new Date().getFullYear() + ')', `(ABBR='RL')`];
    return this.userLeaveEntitlementSummaryDbService.findByFilterV2([], filter).pipe(
      mergeMap(
        data => {
          if (data.length > 0) {
            replacementLeaveId = data[0].LEAVE_TYPE_GUID;
          } else {
            throw new NotFoundException('Leavetype not found');
          }

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
          const filter = ['(USER_GUID=' + userGuid + ')', '(LEAVE_TYPE_GUID=' + replacementLeaveId + ')', '(ACTIVE_FLAG=1)', '(YEAR=' + new Date().getFullYear() + ')'];
          return this.userLeaveEntitlementDbService.findByFilterV2(field, filter);
        }), map(res => {
          let activeRL = res.filter(x => moment(x.EXPIREDATE, 'YYYY-MM-DD') > moment());
          let expiredRL = res.filter(x => moment(x.EXPIREDATE, 'YYYY-MM-DD') <= moment());
          let resultTemp = {};
          resultTemp['active'] = activeRL;
          resultTemp['expired'] = expiredRL;
          return resultTemp;
        })

    );
  }

  /**
   * Get my leavetype
   *
   * @param {*} [leavecode, type, userguid]
   * @returns
   * @memberof DashboardLeaveService
   */
  public getMyLeave([leavecode, type, userguid]) {
    let results: Observable<any>;
    let method; // First array is for simple, second array for detailed
    let leavetypeguid;
    let filter = ['(USER_GUID=' + userguid + ')', '(YEAR=' + new Date().getFullYear() + ')'];

    return this.userLeaveEntitlementSummaryDbService.findByFilterV2([], filter).pipe(
      mergeMap(
        data => {
          const ALData = data.find(x => x.ABBR === leavecode);
          if (ALData != undefined) {
            leavetypeguid = ALData.LEAVE_TYPE_GUID;
          } else {
            throw new NotFoundException('Leavetype not found');
          }

          if (leavecode == 'AL') {
            // Annual Leave (AL)
            method = [this.getSimple([leavetypeguid, userguid]), this.getDetailed([leavecode, userguid])];
          }
          if (leavecode == 'BL') {
            // Birthday Leave (BL)
            method = [this.getSimple([leavetypeguid, userguid]), this.getDetailed([leavecode, userguid])];
          }
          if (leavecode == 'CL') {
            // Compassionate Leave (CL)
            method = [this.getSimple([leavetypeguid, userguid]), this.getDetailed([leavecode, userguid])];
          }
          if (leavecode == 'HL') {
            // Hospitalization Leave (HL)
            method = [this.getSimple([leavetypeguid, userguid]), this.getDetailed([leavecode, userguid])];
          }
          if (leavecode == 'ML') {
            // Medical Leave (ML)
            method = [this.getSimple([leavetypeguid, userguid]), this.getDetailed([leavecode, userguid])];
          }
          if (leavecode == 'PL') {
            // Paternity Leave (PL)
            method = [this.getSimple([leavetypeguid, userguid]), this.getDetailed([leavecode, userguid])];
          }
          if (leavecode == 'RL') {
            // Replacement Leave (RL)
            method = [this.getSimple([leavetypeguid, userguid]), this.getReplacementLeave(userguid)];
          }
          if (leavecode == 'MTL') {
            // Maternity Leave (MTL)
            method = [this.getSimple([leavetypeguid, userguid]), this.getDetailed([leavecode, userguid])];
          }
          if (leavecode == 'MRL') {
            // Marriage Leave (MRL)
            method = [this.getSimple([leavetypeguid, userguid]), this.getDetailed([leavecode, userguid])];
          }

          results = this.doProcess([type, method]);

          return results;
        })
    );


  }
  /**
   * Check process detail or simple data
   *
   * @param {*} [type, method]
   * @returns
   * @memberof DashboardLeaveService
   */
  public doProcess([type, method]) {
    let results = type == 'simple' ? method[0] : method[1];
    return results;
  }

  /**
   * Get simple data process
   *
   * @param {*} [leaveguid, userguid]
   * @returns
   * @memberof DashboardLeaveService
   */
  public getSimple([leaveguid, userguid]) {
    const filter = ['(USER_GUID=' + userguid + ')', '(YEAR=' + new Date().getFullYear() + ')', '(LEAVE_TYPE_GUID=' + leaveguid + ')'];
    return this.userLeaveEntitlementSummaryDbService.findByFilterV2([], filter);
  }

  /**
   * Get detailed data process
   *
   * @param {*} [leavecode, userguid]
   * @returns
   * @memberof DashboardLeaveService
   */
  public getDetailed([leavecode, userguid]) {
    return of('No data details for ' + leavecode + ' ' + userguid);
  }

}