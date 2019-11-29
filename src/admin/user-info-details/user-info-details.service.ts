import { Injectable } from '@nestjs/common';
import { UserInfoDbService } from '../holiday/db/user-info.db.service';
import { UpdateUserInfoItemDTO } from './dto/update-user-info-details.dto';
import { Observable } from 'rxjs';
import { EmploymentDetailsDTO } from './dto/employment-details.dto';
import { PersonalDetailsDTO } from './dto/personal-details.dto';
import { map, mergeMap } from 'rxjs/operators';
import { dateDuration } from 'src/common/helper/basic-functions';
import moment = require('moment');
var { convertJsonToXML, convertXMLToJson } = require('@zencloudservices/xmlparser');

/**
 * Service user info details
 *
 * @export
 * @class UserInfoDetailsService
 */
@Injectable()
export class UserInfoDetailsService {
  /**
   *Creates an instance of UserInfoDetailsService.
   * @param {UserInfoDbService} userinfoDbService DB service user info
   * @memberof UserInfoDetailsService
   */
  constructor(
    private readonly userinfoDbService: UserInfoDbService
  ) { }

  /**
   * Get user xml info by user info guid
   *
   * @param {string} userInfoGuid
   * @returns
   * @memberof UserInfoDetailsService
   */
  public getUserXMLInfo(userInfoGuid: string) {
    const filters = ['(USER_INFO_GUID=' + userInfoGuid + ')'];
    return this.userinfoDbService.findByFilterV4([], filters, 'CREATION_TS DESC', 1);
  }

  /**
   * Get user xml info by user guid by latest creation
   *
   * @param {string} userGuid
   * @returns
   * @memberof UserInfoDetailsService
   */
  public getUserXMLInfoUserGuid(userGuid: string) {
    const filters = ['(USER_GUID=' + userGuid + ')'];
    return this.userinfoDbService.findByFilterV4([], filters, 'CREATION_TS DESC', 1);
  }

  /**
   * Update all user info details
   *
   * @param {[UpdateUserInfoItemDTO, string, any]} [data, userInfoGuid, user]
   * @returns {Observable<any>}
   * @memberof UserInfoDetailsService
   */
  public updateUserInfo([data, userInfoGuid, user]: [UpdateUserInfoItemDTO, string, any]): Observable<any> {
    return this.sendResult([data, userInfoGuid, user]);
  }

  /**
   * Update employment info
   *
   * @param {[EmploymentDetailsDTO, string, any]} [data, userInfoGuid, user]
   * @returns
   * @memberof UserInfoDetailsService
   */
  public updateEmploymentInfo([data, userInfoGuid, user]: [EmploymentDetailsDTO, string, any]) {
    return this.getDataAndUpdate(['employmentDetail', data, userInfoGuid, user]);
  }

  /**
   * Update notification info
   *
   * @param {[string[], string, any]} [notificationRule, userInfoGuid, user]
   * @returns
   * @memberof UserInfoDetailsService
   */
  public updateNotificationRule([notificationRule, userInfoGuid, user]: [string[], string, any]) {
    return this.getDataAndUpdate(['notificationRule', notificationRule, userInfoGuid, user]);
  }

  /**
   * Update personal info
   *
   * @param {[PersonalDetailsDTO, string, any]} [data, userInfoGuid, user]
   * @returns
   * @memberof UserInfoDetailsService
   */
  public updatePersonalInfo([data, userInfoGuid, user]: [PersonalDetailsDTO, string, any]) {
    return this.getDataAndUpdate(['personalDetails', data, userInfoGuid, user]);
  }

  /**
   * Get data and update
   *
   * @param {[string, any, string, any]} [process, data, userInfoGuid, user]
   * @returns
   * @memberof UserInfoDetailsService
   */
  public getDataAndUpdate([process, data, userInfoGuid, user]: [string, any, string, any]) {
    let results = this.getUserInfoDetails(userInfoGuid).pipe(
      map(res => { return this.setupDataUserInfo([process, data, res]); }),
      mergeMap(res => { return this.sendResult([res, userInfoGuid, user]); })
    );
    return results;
  }

  /**
   * Setup data user info details
   *
   * @param {[string, any, any]} [process, updateData, res]
   * @returns
   * @memberof UserInfoDetailsService
   */
  public setupDataUserInfo([process, updateData, res]: [string, any, any]) {
    let dataXML = {};
    let dataRoot = {};
    let { employeeDetailsData, personalDetailsData, notificationRuleData } = this.getDataInfo(res.data.resource[0].PROPERTIES_XML);

    dataRoot['employmentDetail'] = employeeDetailsData || {};
    dataRoot['notificationRule'] = notificationRuleData || [];
    dataRoot['personalDetails'] = personalDetailsData || {};

    if (process == 'employmentDetail')
      dataRoot['employmentDetail'] = updateData;
    if (process == 'notificationRule')
      dataRoot['notificationRule'] = updateData;
    if (process == 'personalDetails')
      dataRoot['personalDetails'] = updateData;

    dataXML['root'] = dataRoot;

    return dataXML;
  }

  /**
   * Get user info details
   *
   * @param {string} userInfoGuid
   * @returns {Observable<any>}
   * @memberof UserInfoDetailsService
   */
  public getUserInfoDetails(userInfoGuid: string): Observable<any> {
    const filters = ['(USER_INFO_GUID=' + userInfoGuid + ')'];
    return this.userinfoDbService.findUserInfo(filters);
  }

  /**
   * Update user info data
   *
   * @param {[string, string, any, any]} [xmlData, userInfoGuid, user, res]
   * @returns
   * @memberof UserInfoDetailsService
   */
  public updateUserInfoData([xmlData, userInfoGuid, user, res]: [string, string, any, any]) {
    return this.userinfoDbService.setUserInfo([xmlData, userInfoGuid, user, res]);
  }

  /**
   * Get data user info
   *
   * @param {string} userInfoDataDetails
   * @returns
   * @memberof UserInfoDetailsService
   */
  public getDataInfo(userInfoDataDetails: string) {

    let dataInfo: UpdateUserInfoItemDTO;
    let employeeDetailsData;
    let personalDetailsData;
    let notificationRuleData;

    if (userInfoDataDetails != null) {
      // dataInfo = this.xmlParserService.convertXMLToJson(userInfoDataDetails);
      dataInfo = convertXMLToJson(userInfoDataDetails);
      employeeDetailsData = dataInfo.root.employmentDetail;
      personalDetailsData = dataInfo.root.personalDetails;
      notificationRuleData = dataInfo.root.notificationRule;
    }

    return { employeeDetailsData, personalDetailsData, notificationRuleData };
  }

  /**
   * Send result
   *
   * @param {*} [res, userInfoGuid, user]
   * @returns
   * @memberof UserInfoDetailsService
   */
  public sendResult([res, userInfoGuid, user]) {
    // let xmlData = this.xmlParserService.convertJsonToXML(res);
    let xmlData = convertJsonToXML(res);

    return this.updateUserInfoData([xmlData, userInfoGuid, user, res]);
  }

  /**
   * Filter results
   *
   * @param {*} [data, res, dataId]
   * @memberof UserInfoDetailsService
   */
  public filterResults([data, res, dataId]) {
    let results = data[0];
    let resultItem = {};

    resultItem['id'] = results.USER_INFO_GUID;
    resultItem['userId'] = results.USER_GUID;
    resultItem['employeeName'] = results.FULLNAME;

    if (results.PROPERTIES_XML != null) {
      // let dataXML = this.xmlParserService.convertXMLToJson(results.PROPERTIES_XML);
      let dataXML = convertXMLToJson(results.PROPERTIES_XML);
      if (dataId == 'personal-details') {
        // resultItem['employeeDesignation'] = results.DESIGNATION;
        // resultItem['employeeLocation'] = results.BRANCH;
        // resultItem['employeeDepartment'] = results.DEPARTMENT;
        // resultItem['calendarId'] = results.CALENDAR_GUID;
        // resultItem['tenantId'] = results.TENANT_GUID;
        // resultItem['link'] = "https://zencloudservicesstore.blob.core.windows.net/cloudservices/eleave/";
        // if (dataXML.hasOwnProperty('root') && dataXML.root.hasOwnProperty('personalDetails')) {
        //   resultItem['personalDetail'] = dataXML.root.personalDetails;
        //   resultItem['personalDetail']['gender'] = dataXML.root.personalDetails.gender == 1 ? 'Male' : 'Female';
        //   resultItem['personalDetail']['maritalStatus'] = dataXML.root.personalDetails.maritalStatus == 1 ? 'Married' : 'Single';
        // }
        this.personalDetailAssign([resultItem, results, dataXML]);
      } else if (dataId == 'employment-detail') {
        // if (dataXML.hasOwnProperty('root') && dataXML.root.hasOwnProperty('employmentDetail')) {
        //   resultItem['employmentDetail'] = dataXML.root.employmentDetail;
        //   const { years, months, days } = dateDuration([moment().format('YYYY-MM-DD'), results.JOIN_DATE]);
        //   const serviceDuration = years + ' years ' + months + ' months ' + days + ' days';
        //   resultItem['employmentDetail']['yearOfService'] = serviceDuration;
        // }
        this.employmentDetailAssign([resultItem, results, dataXML]);
      } else if (dataId == 'notification-rule') {
        // if (dataXML.hasOwnProperty('root') && dataXML.root.hasOwnProperty('notificationRule')) {
        //   resultItem['notificationRule'] = dataXML.root.notificationRule;
        // }
        this.notificationRuleAssign([resultItem, dataXML]);
      }
    }

    res.send(resultItem);
  }

  /**
   * Personal detail results setup
   *
   * @param {*} [resultItem, results, dataXML]
   * @memberof UserInfoDetailsService
   */
  public personalDetailAssign([resultItem, results, dataXML]) {
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
   * Employment detail result setup
   *
   * @param {*} [resultItem, results, dataXML]
   * @memberof UserInfoDetailsService
   */
  public employmentDetailAssign([resultItem, results, dataXML]) {
    if (dataXML.hasOwnProperty('root') && dataXML.root.hasOwnProperty('employmentDetail')) {
      resultItem['employmentDetail'] = dataXML.root.employmentDetail;
      const { years, months, days } = dateDuration([moment().format('YYYY-MM-DD'), results.JOIN_DATE]);
      const serviceDuration = years + ' years ' + months + ' months ' + days + ' days';
      resultItem['employmentDetail']['yearOfService'] = serviceDuration;
    }
  }

  /**
   * Notification rule result setup
   *
   * @param {*} [resultItem, dataXML]
   * @memberof UserInfoDetailsService
   */
  public notificationRuleAssign([resultItem, dataXML]) {
    if (dataXML.hasOwnProperty('root') && dataXML.root.hasOwnProperty('notificationRule')) {
      resultItem['notificationRule'] = dataXML.root.notificationRule;
    }
  }

}