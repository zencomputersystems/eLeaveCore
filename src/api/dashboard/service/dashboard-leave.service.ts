import { Injectable, NotFoundException } from '@nestjs/common';
import { UserLeaveEntitlementSummaryDbService } from '../../userprofile/db/user-leave-summary.db.service';
import { UserLeaveEntitlementDbService } from '../../userprofile/db/user-leave-entitlement.db.service';
import { of, Observable, forkJoin } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import * as moment from 'moment';
import { LeavetypeEntitlementDbService } from '../../../admin/leavetype-entitlement/db/leavetype-entitlement.db.service';
import { EntitlementRoundingService } from 'src/common/policy/entitlement-rounding/services/entitlement-rounding.service';
import { dateToValidate, entitledCount } from 'src/common/helper/basic-functions';
import { LeaveTransactionDbService } from 'src/api/leave/db/leave-transaction.db.service';
/** XMLparser from zen library  */
var { convertXMLToJson } = require('@zencloudservices/xmlparser');
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
    private readonly userLeaveEntitlementDbService: UserLeaveEntitlementDbService,
    private readonly leavetypeEntitlementDbService: LeavetypeEntitlementDbService,
    private readonly entitlementRoundingService: EntitlementRoundingService,
    private readonly leaveTransactionDbService: LeaveTransactionDbService
  ) { }

  /**
   * Find leave Data
   * AL and ML
   *
   * @param {[string, string]} [userGuid, abbr]
   * @returns
   * @memberof DashboardLeaveService
   */
  public findLeaveData([userGuid, abbr]: [string, string]) {
    let leaveId;
    let filter = ['(USER_GUID=' + userGuid + ')', '(YEAR=' + new Date().getFullYear() + ')', `(ABBR='${abbr}')`];
    return this.userLeaveEntitlementSummaryDbService.findByFilterV2([], filter).pipe(
      mergeMap(
        data => {
          if (data.length > 0) {
            leaveId = data[0].LEAVE_TYPE_GUID;
            const field = [];
            const filter = ['(ENTITLEMENT_GUID=' + data[0].ENTITLEMENT_GUID + ')'];
            let userLeaveEntitlement = this.userLeaveEntitlementDbService.findByFilterV2([], [`(USER_GUID=${userGuid})`, `(YEAR=${new Date().getFullYear()})`, `(LEAVE_TYPE_GUID=${data[0].LEAVE_TYPE_GUID})`]);
            let leaveTransaction = this.leaveTransactionDbService.findByFilterV2([], [`(USER_GUID=${userGuid})`, `(START_DATE>=${new Date().getFullYear() + '-01-01'})`, `(LEAVE_TYPE_GUID=${data[0].LEAVE_TYPE_GUID})`, `(STATUS IN (APPROVED,PENDING))`]);
            return forkJoin(of(data), this.leavetypeEntitlementDbService.findByFilterV2(field, filter), leaveTransaction, userLeaveEntitlement);
          } else {
            throw new NotFoundException('Leavetype not found');
          }
        }), mergeMap(res => {
          let [data, entitlement, leaveTransaction, userLeaveEntitlement] = res;



          let leavePolicy = convertXMLToJson(entitlement[0].PROPERTIES_XML);
          // data[0].ENTITLED_DAYS = this.entitlementRoundingService.leaveEntitlementRounding(data[0].ENTITLED_DAYS, leavePolicy.leaveEntitlementRounding);
          let dateIndicator = dateToValidate([data[0].JOIN_DATE, data[0].CONFIRMATION_DATE, leavePolicy]);

          let { entitledDaysFinal, totalentitled } = entitledCount([dateIndicator, data[0].RESIGNATION_DATE, leavePolicy]);
          data[0].ENTITLED_DAYS = this.entitlementRoundingService.leaveEntitlementRounding(totalentitled, leavePolicy.leaveEntitlementRounding.toUpperCase());
          data[0].EARNED_LEAVE = this.entitlementRoundingService.leaveEntitlementRounding(entitledDaysFinal, leavePolicy.leaveEntitlementRounding.toUpperCase());;
          data[0].BALANCE_DAYS = (data[0].EARNED_LEAVE - data[0].TOTAL_APPROVED - data[0].TOTAL_PENDING);
          data[0].BALANCE_DAYS = data[0].BALANCE_DAYS + data[0].ADJUSTMENT_DAYS;
          // data[0].BALANCE_DAYS = this.entitlementRoundingService.leaveEntitlementRounding(data[0].BALANCE_DAYS, leavePolicy.leaveEntitlementRounding);


          if (abbr == 'AL') {
            let cfEntitlement = userLeaveEntitlement.find(x => x.CF_FLAG === 1);
            let etEntitlement = parseFloat(data[0].ENTITLED_DAYS); // userLeaveEntitlement.find(x => x.PARENT_FLAG === 1);

            let leaveTransactionBeforeExpire = leaveTransaction.filter(x => x.START_DATE <= cfEntitlement.EXPIREDATE);
            let leaveTransactionAfterExpire = leaveTransaction.filter(x => x.START_DATE > cfEntitlement.EXPIREDATE);

            let cfUsed = 0;
            leaveTransactionBeforeExpire.forEach(element => {
              cfUsed += element.NO_OF_DAYS;
            });

            let etUsed = 0;
            leaveTransactionAfterExpire.forEach(element => {
              etUsed += element.NO_OF_DAYS;
            })

            let cfBalance = cfEntitlement.DAYS_ADDED - cfUsed;
            let etBalance = etEntitlement - etUsed;

            const end = moment();
            const start = moment(cfEntitlement.EXPIREDATE, "YYYY-MM-DD");
            const startFull = moment(new Date().getFullYear() + '-12-31', "YYYY-MM-DD");

            //Difference in number of days
            let daysExpired = Math.floor(moment.duration(start.diff(end)).asDays());
            let daysExpiredFull = Math.floor(moment.duration(startFull.diff(end)).asDays());
            if (cfBalance < 0) {
              let cfBalanceTemp = Math.abs(cfBalance);
              etBalance = etBalance - cfBalanceTemp;
            }
            cfBalance = cfBalance < 0 ? 0 : cfBalance;
            data[0].BALANCE_CF = cfBalance;
            data[0].BALANCE_ENTITLED = etBalance;
            data[0].EXPIRED_STATUS = `${cfBalance == 1 ? cfBalance + ' day' : cfBalance + ' days'} expired in ${daysExpired == 1 ? daysExpired + ' day.' : daysExpired + ' days.'}`;

            if (cfBalance == 0) {
              data[0].BALANCE_DAYS = data[0].BALANCE_DAYS < 0 ? 0 : data[0].BALANCE_DAYS;
              data[0].EXPIRED_STATUS = `${data[0].BALANCE_DAYS == 1 ? data[0].BALANCE_DAYS + ' day' : data[0].BALANCE_DAYS + ' days'} expired in ${daysExpiredFull == 1 ? daysExpiredFull + ' day.' : daysExpiredFull + ' days.'}`;
            }

          }

          return of(data);
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
        }), mergeMap(res => {
          const filter = ['(USER_GUID=' + userGuid + ')', '(LEAVE_TYPE_GUID=' + replacementLeaveId + ')', '(YEAR=' + new Date().getFullYear() + ')'];
          // this.leaveTransactionDbService.findByFilterV2([],filter);
          let leaveBalance = this.userLeaveEntitlementSummaryDbService.findByFilterV2(['BALANCE_DAYS'], filter);
          return forkJoin(of(res), leaveBalance);
          // return res;
        }), map(result => {
          let [res, leaveBalance] = result;
          // let res = res1;
          // let leaveBalance = res2;
          // console.log(res);
          // console.log(leaveBalance);

          let activeRL = res.filter(x => moment(x.EXPIREDATE, 'YYYY-MM-DD') > moment());
          let expiredRL = res.filter(x => moment(x.EXPIREDATE, 'YYYY-MM-DD') <= moment());
          let resultTemp = {};
          resultTemp['active'] = activeRL;
          resultTemp['expired'] = expiredRL;

          // let balanceDays = 0;
          // if (activeRL.length > 0) {
          //   activeRL.forEach(x => balanceDays = balanceDays + parseInt(x.DAYS_ADDED));
          // }

          resultTemp['balance'] = leaveBalance[0].BALANCE_DAYS;

          // resultTemp['balance'] = balanceDays;
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