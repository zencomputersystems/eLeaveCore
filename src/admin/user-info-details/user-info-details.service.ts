import { Injectable } from '@nestjs/common';
import { UserInfoDbService } from '../holiday/db/user-info.db.service';
import { UpdateUserInfoDetailsDTO, UpdateUserInfoItemDTO } from './dto/update-user-info-details.dto';
import { of, Observable } from 'rxjs';
import { EmploymentDetailsDTO } from './dto/employment-details.dto';
import { PersonalDetailsDTO } from './dto/personal-details.dto';
import { map, mergeMap } from 'rxjs/operators';
import { XMLParserService } from '../../common/helper/xml-parser.service';
import { dateDuration } from 'src/common/helper/basic-functions';
import moment = require('moment');

@Injectable()
export class UserInfoDetailsService {
  constructor(
    private readonly userinfoDbService: UserInfoDbService,
    private readonly xmlParserService: XMLParserService
  ) { }

  public getUserXMLInfo(userInfoGuid: string) {
    const filters = ['(USER_INFO_GUID=' + userInfoGuid + ')'];
    return this.userinfoDbService.findByFilterV4([], filters, 'CREATION_TS DESC', 1);
  }

  public getUserXMLInfoUserGuid(userGuid: string) {
    const filters = ['(USER_GUID=' + userGuid + ')'];
    return this.userinfoDbService.findByFilterV4([], filters, 'CREATION_TS DESC', 1);
  }

  public updateUserInfo([data, userInfoGuid, user]: [UpdateUserInfoItemDTO, string, any]): Observable<any> {
    return this.sendResult([data, userInfoGuid, user]);
  }

  public updateEmploymentInfo([data, userInfoGuid, user]: [EmploymentDetailsDTO, string, any]) {
    let results = this.getUserInfoDetails(userInfoGuid).pipe(
      map(res => { return this.setupDataUserInfo(['employmentDetail', data, res]); }),
      mergeMap(res => { return this.sendResult([res, userInfoGuid, user]); })
    );

    return results;
  }

  public updateNotificationRule([notificationRule, userInfoGuid, user]: [string[], string, any]) {
    let results = this.getUserInfoDetails(userInfoGuid).pipe(
      map(res => { return this.setupDataUserInfo(['notificationRule', notificationRule, res]); }),
      mergeMap(res => { return this.sendResult([res, userInfoGuid, user]); })
    );
    return results;
  }

  public updatePersonalInfo([data, userInfoGuid, user]: [PersonalDetailsDTO, string, any]) {
    let results = this.getUserInfoDetails(userInfoGuid).pipe(
      map(res => { return this.setupDataUserInfo(['personalDetails', data, res]); }),
      mergeMap(res => { return this.sendResult([res, userInfoGuid, user]); })
    );
    return results;
  }

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

  public getUserInfoDetails(userInfoGuid: string): Observable<any> {
    const filters = ['(USER_INFO_GUID=' + userInfoGuid + ')'];
    return this.userinfoDbService.findUserInfo(filters);
  }

  public updateUserInfoData([xmlData, userInfoGuid, user, res]: [string, string, any, any]) {
    return this.userinfoDbService.setUserInfo([xmlData, userInfoGuid, user, res]);
  }

  public getDataInfo(userInfoDataDetails: string) {

    let dataInfo: UpdateUserInfoItemDTO;
    let employeeDetailsData;
    let personalDetailsData;
    let notificationRuleData;

    if (userInfoDataDetails != null) {
      dataInfo = this.xmlParserService.convertXMLToJson(userInfoDataDetails);
      employeeDetailsData = dataInfo.root.employmentDetail;
      personalDetailsData = dataInfo.root.personalDetails;
      notificationRuleData = dataInfo.root.notificationRule;
    }

    return { employeeDetailsData, personalDetailsData, notificationRuleData };
  }

  public sendResult([res, userInfoGuid, user]) {
    let xmlData = this.xmlParserService.convertJsonToXML(res);

    return this.updateUserInfoData([xmlData, userInfoGuid, user, res]);
  }

  public filterResults(data, res, dataId) {
    let results = data[0];
    let resultItem = {};

    resultItem['id'] = results.USER_INFO_GUID;
    resultItem['userId'] = results.USER_GUID;
    resultItem['employeeName'] = results.FULLNAME;

    if (results.PROPERTIES_XML != null) {
      let dataXML = this.xmlParserService.convertXMLToJson(results.PROPERTIES_XML);
      if (dataId == 'personal-details') {
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
      } else if (dataId == 'employment-detail') {
        if (dataXML.hasOwnProperty('root') && dataXML.root.hasOwnProperty('employmentDetail')) {
          resultItem['employmentDetail'] = dataXML.root.employmentDetail;
          const { years, months, days } = dateDuration([moment().format('YYYY-MM-DD'), results.JOIN_DATE]);
          const serviceDuration = years + ' years ' + months + ' months ' + days + ' days';
          resultItem['employmentDetail']['yearOfService'] = serviceDuration;
        }
      } else if (dataId == 'notification-rule') {
        if (dataXML.hasOwnProperty('root') && dataXML.root.hasOwnProperty('notificationRule')) {
          resultItem['notificationRule'] = dataXML.root.notificationRule;
        }
      }
    }

    res.send(resultItem);
  }

}