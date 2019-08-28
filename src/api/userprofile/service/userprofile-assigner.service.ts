import { UserInfoModel } from 'src/admin/user-info/model/user-info.model';
import { UserProfileDTO } from '../dto/userprofile-detail/userprofile.dto';
import { PersonalDetailXML } from '../dto/userprofile-detail/personal-detail/xml/personal-detail.xml';
import { UserPersonalDetailDTO } from '../dto/userprofile-detail/personal-detail/user-personal-detail.dto';
import { EmploymentDetailDTO } from '../dto/userprofile-detail/employment-detail/employment-detail.dto';
import { ServiceYearCalc } from 'src/common/policy/entitlement-type/services/service-year-calculation-service/serviceYearCalc.service';
import { XMLParserService } from 'src/common/helper/xml-parser.service';
import { Injectable } from '@nestjs/common';
import { UserInfoService } from 'src/admin/user-info/user-info.service';
import { map } from 'rxjs/operators';

type ProfileDataDetails = [UserInfoModel, boolean, boolean, boolean, boolean];
type PersonalDataDetails = [UserInfoModel, boolean, boolean, UserProfileDTO];

/**
 * Service to assign profile data
 *
 * @export
 * @class UserprofileAssignerService
 */
@Injectable()
export class UserprofileAssignerService {

  /**
   *Creates an instance of UserprofileAssignerService.
   * @param {ServiceYearCalc} serviceYearCalcService Service calculate year of working
   * @param {XMLParserService} xmlParserService Service convert xml to json
   * @memberof UserprofileAssignerService
   */
  constructor(
    private readonly serviceYearCalcService: ServiceYearCalc,
    private readonly xmlParserService: XMLParserService,
    private readonly userInfoService: UserInfoService
  ) { }



  /**
   * Main function build userprofile data
   *
   * @param {ProfileDataDetails} profileDataDetails
   * @returns
   * @memberof UserprofileAssignerService
   */
  public buildProfileData(profileDataDetails: ProfileDataDetails) {

    let data: UserInfoModel = profileDataDetails[0];
    let isShowPersonalData: boolean = profileDataDetails[1];
    let isShowEmploymentData: boolean = profileDataDetails[2];
    let isShowEntitlementData: boolean = profileDataDetails[3];
    let isShowCertData: boolean = profileDataDetails[4];

    const userProfileData = new UserProfileDTO();

    this.assignUserProfileData(userProfileData, data);

    if (data.PROPERTIES_XML) {
      this.personaldetailProcess([data, isShowPersonalData, isShowCertData, userProfileData]);
    }

    if (isShowEmploymentData) {
      userProfileData.employmentDetail = this.assignEmploymentDetail(data); //employmentDetail;
    }

    if (isShowEntitlementData) {
      userProfileData.entitlementDetail = [];
    }

    return userProfileData;
  }



  /**
   * Assign user profile data first method refactor - important main info
   *
   * @private
   * @param {UserProfileDTO} userProfileData
   * @param {UserInfoModel} data
   * @returns
   * @memberof UserprofileAssignerService
   */
  private assignUserProfileData(userProfileData: UserProfileDTO, data: UserInfoModel) {
    userProfileData.id = data.USER_INFO_GUID;
    userProfileData.userId = data.USER_GUID;
    userProfileData.employeeName = data.FULLNAME;
    userProfileData.employeeDesignation = data.DESIGNATION;
    userProfileData.employeeLocation = data.TENANT_COMPANY_GUID;
    userProfileData.employeeDepartment = data.DEPARTMENT;
    userProfileData.calendarId = data.CALENDAR_GUID;
    userProfileData.tenantId = data.TENANT_GUID;

    return userProfileData;
  }



  /**
   * Assign user profile data second method refactor - personal data and certification data
   *
   * @private
   * @param {PersonalDataDetails} personalDataDetails
   * @memberof UserprofileAssignerService
   */
  private personaldetailProcess(personalDataDetails: PersonalDataDetails) {
    let data: UserInfoModel = personalDataDetails[0];
    let isShowPersonalData: boolean = personalDataDetails[1];
    let isShowCertData: boolean = personalDataDetails[2];
    let userProfileData: UserProfileDTO = personalDataDetails[3];

    // process the personal detail
    const parseXMLtoJSON: PersonalDetailXML = this.xmlParserService.convertXMLToJson(data.PROPERTIES_XML);

    if (isShowPersonalData) {
      this.personaldataProcess(parseXMLtoJSON, userProfileData, isShowCertData);
    }

    // if (isShowCertData) {
    //   userProfileData.awardCertification = parseXMLtoJSON.certification;
    // }
  }



  /**
   * Assign user profile data third method refactor - personal data details
   *
   * @private
   * @param {*} parseXMLtoJSON
   * @param {*} userProfileData
   * @memberof UserprofileAssignerService
   */
  private personaldataProcess(parseXMLtoJSON, userProfileData, isShowCertData) {
    const userPersonalDetail = new UserPersonalDetailDTO();
    for (var j in parseXMLtoJSON) {
      var sub_key = j;
      var sub_val = parseXMLtoJSON[j];

      // skip key id
      if (sub_key == 'id') {
        continue;
      }

      if (!isShowCertData && sub_key == 'certification') {
        continue;
      }


      // loop process to refactor code
      this.doProcess(sub_key, sub_val, userPersonalDetail);
    }
    userProfileData.personalDetail = userPersonalDetail;
  }



  /**
   * Loop data for personal details
   *
   * @private
   * @param {*} sub_key
   * @param {*} sub_val
   * @param {*} userPersonalDetail
   * @memberof UserprofileAssignerService
   */
  private doProcess(sub_key, sub_val, userPersonalDetail) {
    if (sub_key == 'gender') { sub_val = sub_val == 1 ? 'Male' : 'Female'; } // convert gender code to text
    if (sub_key == 'maritalStatus') { sub_val = sub_val == 1 ? 'Married' : 'Single'; } // convert maritalstatus to text
    // if (sub_key == 'address1') { sub_key = 'residentialAddress1'; } // change key address1 to key residentialaddress1
    // if (sub_key == 'address2') { sub_key = 'residentialAddress2'; } // change ker address2 to key residentialaddress2
    // if (sub_key == 'emergencyContact') { sub_key = 'emergencyContactNumber'; } // change key emergency contact to emergencycontactnumber

    userPersonalDetail[sub_key] = sub_val;
  }



  /**
   * Assign user profile data forth method refactor - employment detail
   *
   * @private
   * @param {UserInfoModel} data
   * @returns
   * @memberof UserprofileAssignerService
   */
  private assignEmploymentDetail(data: UserInfoModel) {
    const employmentDetail = new EmploymentDetailDTO();

    // process the employment data
    employmentDetail.department = data.DEPARTMENT;
    employmentDetail.designation = data.DESIGNATION;;
    employmentDetail.workLocation = "Kuala Lumpur, Malaysia"
    employmentDetail.employeeNumber = data.PERSONAL_ID;
    employmentDetail.employmentStatus = data.EMPLOYEE_STATUS.toString();
    employmentDetail.employmentType = data.EMPLOYEE_TYPE.toString();
    employmentDetail.reportingTo = data.MANAGER_USER_GUID;

    if (data.MANAGER_USER_GUID != null && data.MANAGER_USER_GUID != '' && data.MANAGER_USER_GUID != undefined)
      this.findManagerName(data.MANAGER_USER_GUID, employmentDetail); //.subscribe(data => { employmentDetail.reportingTo = data; });


    this.assignEmploymentDetail2(employmentDetail, data);

    return employmentDetail;
  }

  /**
   * Get manager reporting to name
   *
   * @param {*} managerGuid
   * @param {*} employmentDetail
   * @memberof UserprofileAssignerService
   */
  public findManagerName(managerGuid, employmentDetail) {
    this.userInfoService.findOne(managerGuid, '').subscribe(
      data => {
        // console.log(data.data.resource[0].FULLNAME);
        return employmentDetail.reportingTo = data.data.resource[0].FULLNAME;
      }, err => {
        console.log(err);
      }
    );
    // return this.userInfoService.findOne(managerGuid, '')
    // // .pipe(map(
    // //   res => { console.log(res.data.resource[0].FULLNAME); return employmentDetail.reportingTo = res.data.resource[0].FULLNAME; }))
    // .subscribe(
    // data => {
    //   console.log(data);
    //   return data;
    //   // if (data.data.resource[0].FULLNAME != undefined) {
    //   //   // console.log(data.data.resource[0].FULLNAME);
    //   //   return data.data.resource[0].FULLNAME;
    //   // } else {
    //   //   return null;
    //   // }
    // }, err => {
    //   console.log(err);
    // }
    // );
  }

  /**
   * Refactor to continue assign employment detail
   *
   * @private
   * @param {*} employmentDetail
   * @param {*} data
   * @returns
   * @memberof UserprofileAssignerService
   */
  private assignEmploymentDetail2(employmentDetail, data) {

    employmentDetail.userRole = "Employee";
    employmentDetail.dateOfJoin = data.JOIN_DATE;
    employmentDetail.dateOfConfirmation = data.CONFIRMATION_DATE;
    employmentDetail.dateOfResign = data.RESIGNATION_DATE;
    employmentDetail.yearOfService = this.serviceYearCalcService.calculateEmployeeServiceYear(new Date(data.JOIN_DATE)) + " Years";
    employmentDetail.epfNumber = data.PR_EPF_NUMBER;
    employmentDetail.incomeTaxNumber = data.PR_INCOMETAX_NUMBER;
    employmentDetail.bankAccountName = data.BANK;
    employmentDetail.bankAccountNumber = data.PR_ACCOUNT_NUMBER;

    return employmentDetail;
  }

}