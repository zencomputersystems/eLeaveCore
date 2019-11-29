import { dateDuration } from 'src/common/helper/basic-functions';
import moment = require('moment');

/**
 * Personal detail assign
 *
 * @export
 * @param {*} [resultItem, results, dataXML]
 */
export function personalDetailAssign([resultItem, results, dataXML]) {
  resultItem['employeeDesignation'] = results.DESIGNATION;
  resultItem['employeeLocation'] = results.BRANCH;
  resultItem['employeeDepartment'] = results.DEPARTMENT;
  resultItem['calendarId'] = results.CALENDAR_GUID;
  resultItem['tenantId'] = results.TENANT_GUID;
  resultItem['link'] = "https://zencloudservicesstore.blob.core.windows.net/cloudservices/eleave/";
  if (dataXML.hasOwnProperty('root') && dataXML.root.hasOwnProperty('personalDetails')) {
    resultItem['personalDetail'] = dataXML.root.personalDetails;
    resultItem['personalDetail']['gender'] = dataXML.root.personalDetails.gender == 1 ? 'Male' : 'Female';
    resultItem['personalDetail']['maritalStatus'] = dataXML.root.personalDetails.maritalStatus == 1 ? 'Married' : 'Single';
  }
}

/**
 * Employment detail assign
 *
 * @export
 * @param {*} [resultItem, results, dataXML]
 */
export function employmentDetailAssign([resultItem, results, dataXML]) {
  if (dataXML.hasOwnProperty('root') && dataXML.root.hasOwnProperty('employmentDetail')) {
    resultItem['employmentDetail'] = dataXML.root.employmentDetail;
    const { years, months, days } = dateDuration([moment().format('YYYY-MM-DD'), results.JOIN_DATE]);
    const serviceDuration = years + ' years ' + months + ' months ' + days + ' days';
    resultItem['employmentDetail']['yearOfService'] = serviceDuration;
  }
}

/**
 * Notification rule assign
 *
 * @export
 * @param {*} [resultItem, dataXML]
 */
export function notificationRuleAssign([resultItem, dataXML]) {
  if (dataXML.hasOwnProperty('root') && dataXML.root.hasOwnProperty('notificationRule')) {
    resultItem['notificationRule'] = dataXML.root.notificationRule;
  }
}