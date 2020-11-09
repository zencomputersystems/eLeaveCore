import { Injectable } from '@nestjs/common';
import { LeaveEntitlementReportDto, LeaveDetailsDto } from '../dto/leave-entitlement-report.dto';
import { Observable } from 'rxjs';
import { ReportDBService } from './report-db.service';
import { map, mergeMap, flatMap, filter } from 'rxjs/operators';
import { PendingLeaveService } from 'src/admin/approval-override/pending-leave.service';
import { LeaveTransactionDbService } from 'src/api/leave/db/leave-transaction.db.service';
import { runServiceCallback } from 'src/common/helper/basic-functions';
import moment = require('moment');
import { EntitlementRoundingService } from 'src/common/policy/entitlement-rounding/services/entitlement-rounding.service';
import { LeaveTypePropertiesXmlDTO } from 'src/admin/leavetype-entitlement/dto/xml/leavetype-properties.xml.dto';
/** XMLparser from zen library  */
var { convertXMLToJson, convertJsonToXML } = require('@zencloudservices/xmlparser');
/**
 * Leave entitlement report service
 *
 * @export
 * @class LeaveEntitlementReportService
 */
@Injectable()
export class LeaveEntitlementReportService {
  /**
   *Creates an instance of LeaveEntitlementReportService.
   * @param {ReportDBService} reportDBService
   * @param {PendingLeaveService} pendingLeaveService
   * @memberof LeaveEntitlementReportService
   */
  constructor(
    private readonly reportDBService: ReportDBService,
    private readonly pendingLeaveService: PendingLeaveService,
    private readonly leaveTransactionDbService: LeaveTransactionDbService,
    private readonly entitlementRoundingService: EntitlementRoundingService
  ) { }
  /**
   * Get leave entitlement data
   *
   * @param {[string, string]} [tenantId, userId]
   * @returns {Observable<any>}
   * @memberof LeaveEntitlementReportService
   */
  getLeaveEntitlementData([tenantId, userId]: [string, string]): Observable<any> {
    let filter = [`(TENANT_GUID=${tenantId})`, `(YEAR=${new Date().getFullYear()})`]; // for all user
    const extra = ['(USER_GUID=' + userId + ')']; // for one user
    filter = userId != null ? filter.concat(extra) : filter; // chcek if one user add extra filter

    // get leave entitlement summary
    return this.reportDBService.userLeaveEntitlementSummary.findByFilterV2([], filter).pipe(
      mergeMap(async res => {
        let leaveTypeList = await this.pendingLeaveService.getLeavetypeList(res[0].TENANT_GUID);
        let resultAll = await this.pendingLeaveService.getAllUserInfo(res[0].TENANT_GUID) as any[];
        // let filterTemp = [`(TENANT_GUID=${tenantId})`, `(CREATION_TS>=${moment((new Date().getFullYear() + '-01-01'), 'YYYY-MM-DD')})`];
        let filterTemp = [`(TENANT_GUID=${tenantId})`, `(CREATION_TS>=${moment((new Date().getFullYear() + '-01-01'), 'YYYY-MM-DD').format('YYYY-MM-DD')})`, `(STATUS IN ('PENDING','APPROVED'))`];
        filterTemp = userId != null ? filterTemp.concat(extra) : filterTemp;

        let fieldTemp = ['LEAVE_TYPE_GUID', 'USER_GUID', 'ENTITLEMENT_GUID', 'START_DATE', 'END_DATE', 'NO_OF_DAYS', 'STATUS', 'CREATION_TS'];
        let method = this.leaveTransactionDbService.findByFilterV2(fieldTemp, filterTemp);
        let leaveTransactionData = await this.pendingLeaveService.runService(method);

        let method2 = this.reportDBService.userLeaveEntitlementDbService.findByFilterV2(['LEAVE_TYPE_GUID', 'USER_GUID', 'CREATION_TS', 'EXPIREDATE', 'DAYS_ADDED', 'ACTIVE_FLAG'], [`(TENANT_GUID=${tenantId})`, `(YEAR=${moment((new Date().getFullYear() + '-01-01'), 'YYYY-MM-DD').format('YYYY')})`, `(DELETED_AT IS NULL)`]);
        let leaveEntitlementData = await this.pendingLeaveService.runService(method2);

        let arrTemp = [];
        res.forEach(element => {
          if (!arrTemp.find(x => x === element.ENTITLEMENT_GUID))
            arrTemp.push(element.ENTITLEMENT_GUID);
        });
        console.log(arrTemp);
        let entitlementPolicy = await runServiceCallback(this.reportDBService.leaveEntitlementDbService.findByFilterV2([], ['(ENTITLEMENT_GUID IN (' + arrTemp + '))']));

        return { res, leaveTypeList, resultAll, leaveTransactionData, leaveEntitlementData, entitlementPolicy };
      }),
      map(result => {
        let { res, leaveTypeList, resultAll, leaveTransactionData, leaveEntitlementData, entitlementPolicy } = result;
        let userIdList = [];

        let MCData = res.find(x => x.ABBR === 'ML');

        res.forEach(async element => {
          const userId = userIdList.find(x => (x.userGuid == element.USER_GUID));
          let resultUser = resultAll.find(x => x.USER_GUID === element.USER_GUID);

          if (!userId) {
            let leaveEntitlementReportDTO = new LeaveEntitlementReportDto;
            leaveEntitlementReportDTO.userGuid = element.USER_GUID;
            leaveEntitlementReportDTO.employeeNo = resultUser.STAFF_ID;
            leaveEntitlementReportDTO.employeeName = resultUser.FULLNAME;
            leaveEntitlementReportDTO.designation = resultUser.DESIGNATION;

            leaveEntitlementReportDTO.companyName = resultUser.COMPANY_NAME;
            leaveEntitlementReportDTO.department = resultUser.DEPARTMENT;
            leaveEntitlementReportDTO.costcentre = resultUser.COSTCENTRE;
            leaveEntitlementReportDTO.branch = resultUser.BRANCH;

            leaveEntitlementReportDTO.yearService = 1;

            const leaveData = this.assignData([element, leaveTypeList, leaveTransactionData, leaveEntitlementData, MCData, entitlementPolicy]);

            leaveEntitlementReportDTO.abbr = [];
            leaveEntitlementReportDTO.abbr.push(leaveData.leaveTypeAbbr);

            leaveEntitlementReportDTO.leaveDetail = [];
            leaveEntitlementReportDTO.leaveDetail.push(leaveData);
            userIdList.push(leaveEntitlementReportDTO);

          } else {
            const leaveData = this.assignData([element, leaveTypeList, leaveTransactionData, leaveEntitlementData, MCData, entitlementPolicy]);
            userId.abbr.push(leaveData.leaveTypeAbbr);
            userId.leaveDetail.push(leaveData);
          }

        });

        return userIdList;

      }), map(res => {
        return res;
      })
    );


  }

  /**
   * Assign data
   *
   * @param {*} [element, leaveTypeList]
   * @returns
   * @memberof LeaveEntitlementReportService
   */
  assignData([element, leaveTypeList, leaveTransactionData, leaveEntitlementData, MCData, entitlementPolicy]) {
    // merge leave for user 
    const leaveData = new LeaveDetailsDto;
    let findLeaveData = leaveTypeList.find(x => x.LEAVE_TYPE_GUID === element.LEAVE_TYPE_GUID);
    const forfeitedDays = this.calculateForfeited([element, leaveTransactionData, leaveEntitlementData, findLeaveData]);

    let findData = entitlementPolicy.find(x => x.ENTITLEMENT_GUID === element.ENTITLEMENT_GUID);
    let leavePolicy = convertXMLToJson(findData.PROPERTIES_XML);
    let dateIndicator = this.dateToValidate([element.JOIN_DATE, element.CONFIRMATION_DATE, leavePolicy]);


    let { entitledDaysFinal, totalentitled } = this.entitledCount([dateIndicator, leavePolicy]);
    element.ENTITLED_DAYS = totalentitled;

    // if (leavePolicy.leaveEntitlementType.toUpperCase() == ('Prorated from date-of-confirm to current month').toUpperCase() || leavePolicy.leaveEntitlementType.toUpperCase() == ('Prorated from date-of-join to current month').toUpperCase()) {
    //   let currentmonth = moment().format('M') as any;
    //   // element.ENTITLED_DAYS = this.entitlementRoundingService.leaveEntitlementRounding(element.ENTITLED_DAYS, leavePolicy.leaveEntitlementRounding);

    //   let earnedLeave = (element.ENTITLED_DAYS / 12) * currentmonth;
    //   // earnedLeave = this.entitlementRoundingService.leaveEntitlementRounding(earnedLeave, leavePolicy.leaveEntitlementRounding);
    //   // earnedLeave = (Math.floor(earnedLeave * 4) / 4);
    //   element.EARNED_LEAVE = earnedLeave;
    // } else {
    //   // element.ENTITLED_DAYS = this.entitlementRoundingService.leaveEntitlementRounding(element.ENTITLED_DAYS, leavePolicy.leaveEntitlementRounding);
    //   element.EARNED_LEAVE = element.ENTITLED_DAYS;
    element.EARNED_LEAVE = entitledDaysFinal;
    //   // element.EARNED_LEAVE = this.entitlementRoundingService.leaveEntitlementRounding(element.EARNED_LEAVE, leavePolicy.leaveEntitlementRounding);
    // }
    element.EARNED_LEAVE = this.entitlementRoundingService.leaveEntitlementRounding(element.EARNED_LEAVE, leavePolicy.leaveEntitlementRounding);

    if (findLeaveData.ABBR == 'HL') {
      element.TOTAL_PENDING = element.TOTAL_PENDING + MCData.TOTAL_PENDING;
      element.TOTAL_APPROVED = element.TOTAL_APPROVED + MCData.TOTAL_APPROVED;
      element.ADJUSTMENT_DAYS = MCData.ADJUSTMENT_DAYS;
    }
    if (!findLeaveData) {
      findLeaveData = {};
      findLeaveData['CODE'] = null;
      findLeaveData['ABBR'] = null;
    }
    element.BALANCE_DAYS = (element.EARNED_LEAVE - element.TOTAL_APPROVED - element.TOTAL_PENDING);
    leaveData.leaveTypeId = element.LEAVE_TYPE_GUID;
    leaveData.leaveTypeName = findLeaveData.CODE;
    leaveData.leaveTypeAbbr = findLeaveData.ABBR;
    leaveData.entitledDays = element.ENTITLED_DAYS;
    leaveData.carriedForward = element.CF_DAYS ? element.CF_DAYS : 0;
    leaveData.forfeited = forfeitedDays.toString();// "0";
    leaveData.adjusted = element.ADJUSTMENT_DAYS;
    leaveData.taken = element.TOTAL_APPROVED;
    leaveData.pending = element.TOTAL_PENDING;
    leaveData.balance = element.BALANCE_DAYS;
    return leaveData;
  }

  public dateToValidate([dateJoin, dateConfirm, policyEntitlement]: [any, any, LeaveTypePropertiesXmlDTO]) {
    if (policyEntitlement.leaveEntitlementType.toUpperCase() == "PRORATED FROM DATE-OF-CONFIRM TO CURRENT MONTH" || policyEntitlement.leaveEntitlementType.toUpperCase() == "PRORATED FROM DATE-OF-CONFIRM TO END OF YEAR") {
      return dateConfirm;
    }
    else {
      return dateJoin;
    }
  }

  public entitledCount([dateOfSet, policyJson]: [any, LeaveTypePropertiesXmlDTO]) {
    let totalentitled = 0;
    let entitledTillMonth = 0;
    for (var i = 1; i <= 12; i++) {

      var d = new Date(new Date().getFullYear(), i, 1, 1);
      // console.log(d);
      // console.log(dateOfSet);
      let yearOfService = moment.duration(moment(d).diff(dateOfSet)).asMonths();
      // console.log(yearOfService);
      yearOfService = yearOfService / 12;
      // console.log(yearOfService);
      policyJson.levels.leaveEntitlement = Array.isArray(policyJson.levels.leaveEntitlement) ? policyJson.levels.leaveEntitlement : [policyJson.levels.leaveEntitlement];
      let currentLevel = policyJson.levels.leaveEntitlement.find(x => x.serviceYearFrom <= yearOfService && x.serviceYearTo > yearOfService);
      // console.log(currentLevel);
      if (currentLevel != undefined) {
        // console.log(currentLevel.entitledDays);
        let byMonthEntitled = currentLevel.entitledDays / 12;
        // console.log(byMonthEntitled);
        totalentitled += byMonthEntitled;
        if (new Date().getMonth() == d.getMonth()) {
          entitledTillMonth = totalentitled;
        }
      }
    }


    // console.log('Till month : ' + entitledTillMonth);

    // console.log('Till year : ' + totalentitled);
    // console.log(dateOfSet);

    let yearOfServiceFull = moment.duration(moment().diff(dateOfSet)).asYears();
    // console.log(yearOfServiceFull);
    let currentLevel = policyJson.levels.leaveEntitlement.find(x => x.serviceYearFrom <= yearOfServiceFull && x.serviceYearTo > yearOfServiceFull);
    // console.log('Full Entitled : ' + currentLevel.entitledDays);

    let monthOfService = moment.duration(moment().diff(dateOfSet)).asMonths();
    // console.log(monthOfService);
    let after12Month = 0;
    if (monthOfService > 12) {
      let yearService = (monthOfService - 12) / 12;
      // console.log(yearService);
      let levelAfterDeduct = policyJson.levels.leaveEntitlement.find(x => x.serviceYearFrom <= yearService && x.serviceYearTo > yearService);
      after12Month = levelAfterDeduct.entitledDays;
    }

    let entitledDaysFinal = 0;

    if (policyJson.leaveEntitlementType.toUpperCase() == "ENTITLED IN FULL") {
      entitledDaysFinal = currentLevel.entitledDays;
      totalentitled = currentLevel.entitledDays;
    } else if (policyJson.leaveEntitlementType.toUpperCase() == "PRORATED FROM DATE-OF-JOIN TO CURRENT MONTH" || policyJson.leaveEntitlementType.toUpperCase() == "PRORATED FROM DATE-OF-CONFIRM TO CURRENT MONTH") {
      entitledDaysFinal = entitledTillMonth;
    } else if (policyJson.leaveEntitlementType.toUpperCase() == "PRORATED FROM DATE-OF-JOIN TO END OF YEAR" || policyJson.leaveEntitlementType.toUpperCase() == "PRORATED FROM DATE-OF-CONFIRM TO END OF YEAR") {
      entitledDaysFinal = totalentitled;
    } else if (policyJson.leaveEntitlementType.toUpperCase() == "LEAVE ENTITLED AFTER 12 MONTHS") {
      entitledDaysFinal = after12Month;
      totalentitled = entitledDaysFinal;
    }

    return { entitledDaysFinal, totalentitled };
  }

  /**
   * Calculate forfeited
   *
   * @param {*} [element, leaveTransactionData, leaveEntitlementData, findLeaveData]
   * @returns
   * @memberof LeaveEntitlementReportService
   */
  calculateForfeited([element, leaveTransactionData, leaveEntitlementData, findLeaveData]) {

    // get leavetransaction from user
    let leaveDataTransaction = leaveTransactionData.filter(x => x.LEAVE_TYPE_GUID === element.LEAVE_TYPE_GUID && x.USER_GUID === element.USER_GUID);
    // get leave entitlement assign for this user
    let leaveDataEntitlement = leaveEntitlementData.filter(x => x.LEAVE_TYPE_GUID === element.LEAVE_TYPE_GUID && x.USER_GUID === element.USER_GUID);

    let hasExpired = leaveDataEntitlement.filter(x => x.EXPIREDATE !== null);
    let hasInDate = [];
    let forfeited = 0;

    hasExpired.forEach(element => {
      let totalDaysAdded = 0;
      totalDaysAdded += element.DAYS_ADDED;

      hasInDate = leaveDataTransaction.filter(x => x.START_DATE <= element.EXPIREDATE && x.START_DATE >= element.CREATION_TS);

      let totalApplied = 0;
      hasInDate.forEach(hid => {
        totalApplied += hid.NO_OF_DAYS;
      });

      let count = totalDaysAdded - totalApplied;

      if (count > 0)
        forfeited += count;
    });
    forfeited = forfeited < 0 ? 0 : forfeited;
    return forfeited;
  }

}