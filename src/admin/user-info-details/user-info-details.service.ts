import { Injectable } from '@nestjs/common';
import { UserInfoDbService } from '../holiday/db/user-info.db.service';
import { UpdateUserInfoDetailsDTO, UpdateUserInfoItemDTO } from './dto/update-user-info-details.dto';
import { of, Observable } from 'rxjs';
import { EmploymentDetailsDTO } from './dto/employment-details.dto';
import { PersonalDetailsDTO } from './dto/personal-details.dto';
import { map, mergeMap } from 'rxjs/operators';
import { XMLParserService } from '../../common/helper/xml-parser.service';

@Injectable()
export class UserInfoDetailsService {
  constructor(
    private readonly userinfoDbService: UserInfoDbService,
    private readonly xmlParserService: XMLParserService
  ) { }

  public getUserXMLInfo(userGuid: string) {
    const filters = ['(USER_GUID=' + userGuid + ')'];
    return this.userinfoDbService.findByFilterV4([], filters, 'CREATION_TS DESC', 1);
  }

  public updateUserInfo([data, userGuid, user]: [UpdateUserInfoItemDTO, string, any]): Observable<any> {

    return this.sendResult([data, userGuid, user]);

    // let results = 
    // return this.getUserInfoDetails(userGuid).pipe(
    // map(res => {
    // let dataInfo: UpdateUserInfoItemDTO;
    // let dataXML = {};
    // let dataRoot = {};

    // let employeeDetailsData;
    // let personalDetailsData;
    // let notificationRuleData;

    // if (res.data.resource[0].PROPERTIES_XML != null) {
    //   dataInfo = this.xmlParserService.convertXMLToJson(res.data.resource[0].PROPERTIES_XML);
    //   employeeDetailsData = dataInfo.root.employmentDetail;
    //   personalDetailsData = dataInfo.root.personalDetails;
    //   notificationRuleData = dataInfo.root.notificationRule;
    // }
    // let results = this.getDataInfo(res.data.resource[0].PROPERTIES_XML);
    // let { employeeDetailsData, personalDetailsData, notificationRuleData } = results;

    // dataRoot['employmentDetail'] = employeeDetailsData;
    // dataRoot['notificationRule'] = notificationRuleData;
    // dataRoot['personalDetails'] = personalDetailsData;

    // dataXML['root'] = data;

    // return dataXML;
    // return data;
    // return this.sendResult([data, userGuid, user]);
    // })
    // , mergeMap(res => {
    //   // let xmlData = this.xmlParserService.convertJsonToXML(res);

    //   // this.updateUserInfoData([xmlData, userGuid, user]).subscribe();

    //   // return res;
    //   return this.sendResult([res, userGuid, user]);
    // })
    // );

    // return results;

    // return of(data);
  }

  public updateEmploymentInfo([data, userGuid, user]: [EmploymentDetailsDTO, string, any]) {
    let results = this.getUserInfoDetails(userGuid).pipe(
      map(res => {
        // let dataInfo: UpdateUserInfoItemDTO;
        let dataXML = {};
        let dataRoot = {};

        // let employeeDetailsData;
        // let personalDetailsData;
        // let notificationRuleData;

        // if (res.data.resource[0].PROPERTIES_XML != null) {
        //   dataInfo = this.xmlParserService.convertXMLToJson(res.data.resource[0].PROPERTIES_XML);
        //   employeeDetailsData = dataInfo.root.employmentDetail;
        //   personalDetailsData = dataInfo.root.personalDetails;
        //   notificationRuleData = dataInfo.root.notificationRule;
        // }
        let results = this.getDataInfo(res.data.resource[0].PROPERTIES_XML);
        let { employeeDetailsData, personalDetailsData, notificationRuleData } = results;

        dataRoot['employmentDetail'] = data;
        dataRoot['notificationRule'] = notificationRuleData;
        dataRoot['personalDetails'] = personalDetailsData;

        dataXML['root'] = dataRoot;

        return dataXML;
      }), mergeMap(res => {
        // let xmlData = this.xmlParserService.convertJsonToXML(res);

        // this.updateUserInfoData([xmlData, userGuid, user]).subscribe();

        // return res;
        return this.sendResult([res, userGuid, user]);
      })
    );

    return results;
  }

  public updateNotificationRule([notificationRule, userGuid, user]: [string[], string, any]) {
    let results = this.getUserInfoDetails(userGuid).pipe(
      map(res => {
        let dataInfo: UpdateUserInfoItemDTO;
        let dataXML = {};
        let dataRoot = {};

        // let employeeDetailsData;
        // let personalDetailsData;
        // let notificationRuleData;
        // if (res.data.resource[0].PROPERTIES_XML != null) {
        //   dataInfo = this.xmlParserService.convertXMLToJson(res.data.resource[0].PROPERTIES_XML);
        //   employeeDetailsData = dataInfo.root.employmentDetail;
        //   personalDetailsData = dataInfo.root.personalDetails;
        //   notificationRuleData = dataInfo.root.notificationRule;
        // }
        let results = this.getDataInfo(res.data.resource[0].PROPERTIES_XML);
        let { employeeDetailsData, personalDetailsData, notificationRuleData } = results;

        dataRoot['employmentDetail'] = employeeDetailsData;
        dataRoot['notificationRule'] = notificationRule;
        dataRoot['personalDetails'] = personalDetailsData;

        dataXML['root'] = dataRoot;

        return dataXML;
      }), mergeMap(res => {
        // let xmlData = this.xmlParserService.convertJsonToXML(res);
        // return this.updateUserInfoData([xmlData, userGuid, user]);
        return this.sendResult([res, userGuid, user]);
      })
    );
    return results;
  }

  public updatePersonalInfo([data, userGuid, user]: [PersonalDetailsDTO, string, any]) {
    let results = this.getUserInfoDetails(userGuid).pipe(
      map(res => {
        let dataInfo: UpdateUserInfoItemDTO;
        let dataXML = {};
        let dataRoot = {};

        // let employeeDetailsData;
        // let personalDetailsData;
        // let notificationRuleData;

        // if (res.data.resource[0].PROPERTIES_XML != null) {
        //   dataInfo = this.xmlParserService.convertXMLToJson(res.data.resource[0].PROPERTIES_XML);
        //   employeeDetailsData = dataInfo.root.employmentDetail;
        //   personalDetailsData = dataInfo.root.personalDetails;
        //   notificationRuleData = dataInfo.root.notificationRule;
        // }
        let results = this.getDataInfo(res.data.resource[0].PROPERTIES_XML);
        let { employeeDetailsData, personalDetailsData, notificationRuleData } = results;

        dataRoot['employmentDetail'] = employeeDetailsData;
        dataRoot['notificationRule'] = notificationRuleData;
        dataRoot['personalDetails'] = data;

        dataXML['root'] = dataRoot;

        return dataXML;
      }), mergeMap(res => {

        // let xmlData = this.xmlParserService.convertJsonToXML(res);

        // return this.updateUserInfoData([xmlData, userGuid, user]);
        return this.sendResult([res, userGuid, user]);
      })
    );
    return results;
  }

  public getUserInfoDetails(userGuid: string): Observable<any> {
    const filters = ['(USER_GUID=' + userGuid + ') AND (RESIGNATION_DATE IS NULL)'];
    return this.userinfoDbService.findUserInfo(filters);
  }

  public updateUserInfoData([xmlData, userGuid, user]: [string, string, any]) {
    return this.userinfoDbService.setUserInfo(xmlData, userGuid, user);
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

  public sendResult([res, userGuid, user]) {
    let xmlData = this.xmlParserService.convertJsonToXML(res);

    return this.updateUserInfoData([xmlData, userGuid, user]);
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