import { NotFoundException, HttpModule, HttpService } from '@nestjs/common';
import { DreamFactory } from '../../config/dreamfactory';
import { QueryParserService } from './query-parser.service';
import moment = require('moment');
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';
import { LeaveTypePropertiesXmlDTO } from 'src/admin/leavetype-entitlement/dto/xml/leavetype-properties.xml.dto';

//  ---------------------------------------------------------------------------------------------------------------------------
/**
 * Declare httpmodule
 */
const baseModule = HttpModule.register({ headers: { 'Content-Type': 'application/json', 'X-Dreamfactory-API-Key': DreamFactory.df_key } });

/**
 * Return http module
 *
 * @export
 * @returns
 */
export function getModuleHttp() {
  return baseModule;
}

//  ---------------------------------------------------------------------------------------------------------------------------
/**
 * Verify query param or param link
 *
 * @export
 * @param {[any, string, string]} [req, key, id]
 * @returns
 */
export function verifyParam([req, key, id]: [any, string, string]) {
  let dataId = null;
  let dataIdParam = req.query[key];
  if (dataIdParam == null) {
    dataId = id;
  } else {
    dataId = dataIdParam;
  }
  if (dataId == null || dataId == '{' + key + '}') {
    throw new NotFoundException(`Item ${key} not found`);
  }
  return dataId;
}

//  ---------------------------------------------------------------------------------------------------------------------------
/**
 * Get date duration
 *
 * @export
 * @param {[string, string]} [nowDate, pastDate]
 * @returns
 */
export function dateDuration([nowDate, pastDate]: [string, string]) {
  var a = moment(nowDate);
  var b = moment(pastDate);

  var years = a.diff(b, 'year');
  b.add(years, 'years');

  var months = a.diff(b, 'months');
  b.add(months, 'months');

  var days = a.diff(b, 'days');

  return { years, months, days };
}

//  ---------------------------------------------------------------------------------------------------------------------------
/**
 * Set update data (declare once only in all update api)
 *
 * @export
 * @param {[any, string]} [data, userGuid]
 * @returns
 */
export function setUpdateData([data, userGuid]: [any, string]) {
  data.UPDATE_TS = (new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1);
  data.UPDATE_USER_GUID = userGuid;
  return data;
}

//  ---------------------------------------------------------------------------------------------------------------------------
/**
 * Find all list
 *
 * @export
 * @param {[string[], string, QueryParserService, HttpService, string]} [fields, tenantId, queryService, httpService, tableName]
 * @returns {Observable<any>}
 */
export function findAllList([fields, tenantId, queryService, httpService, tableName]: [string[], string, QueryParserService, HttpService, string]): Observable<any> {

  let filters = ['(TENANT_GUID=' + tenantId + ')'];

  if (tableName === 'tenant_company') { filters.push('(DELETED_AT IS NULL)') }

  //url
  const url = queryService.generateDbQueryV2(tableName, fields, filters, []);

  //call DF to validate the user
  return httpService.get(url);

}

//  ---------------------------------------------------------------------------------------------------------------------------

/**
 * Get list data
 *
 * @export
 * @param {*} method
 * @returns
 */
export function getListData(method) {
  return method.pipe(map(res => {
    return getResData(res);
  }))
}

/**
 * Get res data
 *
 * @param {*} res
 * @returns
 */
function getResData(res) {
  if (res.status == 200) {
    return res.data.resource;
  }
}

//  ---------------------------------------------------------------------------------------------------------------------------

/**
 * Get employee service year
 *
 * @export
 * @param {Date} dateOfJoin
 * @returns {number}
 */
export function getEmployeeServiceYear(dateOfJoin: Date): number {

  let now = moment();

  let serviceYear = moment.duration(now.diff(dateOfJoin)).asYears();

  return Math.ceil(serviceYear);

}

//  ---------------------------------------------------------------------------------------------------------------------------

/**
 * Run service callback
 *
 * @export
 * @param {*} method
 * @returns
 */
export async function runServiceCallback(method) {
  const cbService = () => {
    return new Promise((resolve, reject) => {
      method.subscribe(
        data => {
          resolve(data);
        }, err => {
          return reject(err);
        }
      )
    })
  }
  return await cbService();
}

export function dateToValidate([dateJoin, dateConfirm, policyEntitlement]: [any, any, LeaveTypePropertiesXmlDTO]) {
  if (policyEntitlement.leaveEntitlementType.toUpperCase() == "PRORATED FROM DATE-OF-CONFIRM TO CURRENT MONTH" || policyEntitlement.leaveEntitlementType.toUpperCase() == "PRORATED FROM DATE-OF-CONFIRM TO END OF YEAR") {
    return dateConfirm;
  }
  else {
    return dateJoin;
  }
}

export function entitledCount([dateOfSet, policyJson]: [any, LeaveTypePropertiesXmlDTO]) {
  let totalentitled = 0;
  let entitledTillMonth = 0;
  for (var i = 1; i <= 12; i++) {

    var d = new Date(new Date().getFullYear(), i, 1, 1);

    let yearOfService = moment.duration(moment(d).diff(dateOfSet)).asMonths();

    yearOfService = yearOfService / 12;

    policyJson.levels.leaveEntitlement = Array.isArray(policyJson.levels.leaveEntitlement) ? policyJson.levels.leaveEntitlement : [policyJson.levels.leaveEntitlement];
    let currentLevel = policyJson.levels.leaveEntitlement.find(x => x.serviceYearFrom <= yearOfService && x.serviceYearTo > yearOfService);

    if (currentLevel != undefined) {

      let totalDaysInMonth = moment(d).subtract(1, 'days').format('DD');

      let daysOfService = moment.duration(moment(d).diff(dateOfSet)).asDays();

      let byMonthEntitled = currentLevel.entitledDays / 12;

      if (daysOfService <= parseInt(totalDaysInMonth)) {
        byMonthEntitled = byMonthEntitled / parseInt(totalDaysInMonth) * daysOfService;
      }

      totalentitled += byMonthEntitled;

      if (new Date().getMonth() == d.getMonth()) {
        entitledTillMonth = totalentitled;
      }

    }

  }

  let yearOfServiceFull = moment.duration(moment().diff(dateOfSet)).asYears();

  let currentLevel = policyJson.levels.leaveEntitlement.find(x => x.serviceYearFrom <= yearOfServiceFull && x.serviceYearTo > yearOfServiceFull);

  let monthOfService = moment.duration(moment().diff(dateOfSet)).asMonths();

  let after12Month = 0;
  if (monthOfService > 12) {
    let yearService = (monthOfService - 12) / 12;

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