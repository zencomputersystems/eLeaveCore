import { Injectable, Res, Req } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { XMLParserService } from 'src/common/helper/xml-parser.service';
import { UserInfoModel } from 'src/admin/user-info/model/user-info.model';
import { UserPersonalDetailDTO } from '../dto/userprofile-detail/personal-detail/user-personal-detail.dto';
import { UserProfileDTO } from '../dto/userprofile-detail/userprofile.dto';
import { EmploymentDetailDTO } from '../dto/userprofile-detail/employment-detail/employment-detail.dto';
import { EntitlementDetailDTO } from '../dto/userprofile-detail/entitlement-detail/entitlement-detail.dto';
import { leaveEntitlementMock } from '../mockdata/leave-entitlement';
import { UserprofileListDTO } from '../dto/userprofile-list/userprofile-list.dto';
import { UserprofileDbService } from '../db/userprofile.db.service';
import { UpdatePersonalDetailDTO } from '../dto/userprofile-detail/personal-detail/update-personal-detail.dto';
import { UserInfoService } from 'src/admin/user-info/user-info.service';
import { Resource } from 'src/common/model/resource.model';
import { PersonalDetailXML } from '../dto/userprofile-detail/personal-detail/xml/personal-detail.xml';
import { UpdateEmploymentDetailDTO } from '../dto/userprofile-detail/employment-detail/update-employment-detail.dto';
import { Access } from 'src/common/dto/access.dto';
import { ServiceYearCalc } from 'src/common/policy/entitlement-type/services/service-year-calculation-service/serviceYearCalc.service';
import { UserLeaveEntitlementModel } from '../model/user-leave-entitlement.model';
import { UserLeaveEntitlementService } from './user-leave-entitlement.service';

/**
 * Service for user profile
 *
 * @export
 * @class UserprofileService
 */
@Injectable()
export class UserprofileService {

    /**
     *Creates an instance of UserprofileService.
     * @param {UserInfoService} userInfoService
     * @param {UserprofileDbService} userprofileDBService
     * @param {XMLParserService} xmlParserService
     * @param {UserLeaveEntitlementService} entitlementDetailService
     * @param {ServiceYearCalc} serviceYearCalcService
     * @memberof UserprofileService
     */
    constructor(
        private readonly userInfoService: UserInfoService,
        private readonly userprofileDBService: UserprofileDbService,
        private readonly xmlParserService: XMLParserService,
        private readonly entitlementDetailService: UserLeaveEntitlementService,
        private readonly serviceYearCalcService: ServiceYearCalc) { }

    /**
     * Get user profile list
     *
     * @param {string[]} filters
     * @returns
     * @memberof UserprofileService
     */
    public getList(filters: string[]) {
        return this.userprofileDBService.findByFilterV2([], filters)
            .pipe(
                map(res => {
                    const userArray = new Array();

                    res.forEach(element => {

                        userArray.push(
                            new UserprofileListDTO(element, new Access()));

                    });

                    return userArray;
                })
            );
    }

    // Get User Detail
    /**
     * usage : userprofile service get by id or own
     * Get User Detail
     *
     * @param {string[]} filters
     * @returns
     * @memberof UserprofileService
     */
    public getDetail(filters: string[]) {
        return this.userInfoService.findByFilterV2([], filters)
            .pipe(
                map(res => {
                    // console.log(res);
                    const data: UserInfoModel = res[0];

                    if (data) {
                        let dataProfile = new Object;

                        dataProfile['data'] = data; // : UserInfoModel,
                        dataProfile['isShowPersonalData'] = true; // : boolean,
                        dataProfile['isShowEmploymentData'] = true; // : boolean,
                        dataProfile['isShowEntitlementData'] = true; // : boolean,
                        dataProfile['isShowCertData'] = true; // : boolean

                        return this.buildProfileData(dataProfile);
                        // return this.buildProfileData(data, true, true, true, true);
                    }
                })
            )

    }

    //#region PERSONAL DETAIL

    /**
     * Get personal detail
     *
     * @param {string[]} filters
     * @returns
     * @memberof UserprofileService
     */
    public getPersonalDetail(filters: string[]) {
        return this.userInfoService.findByFilterV2([], filters)
            .pipe(
                map(res => {
                    const data: UserInfoModel = res[0];

                    if (data) {
                        let dataProfile = new Object;

                        dataProfile['data'] = data; // : UserInfoModel,
                        dataProfile['isShowPersonalData'] = true; // : boolean,
                        dataProfile['isShowEmploymentData'] = false; // : boolean,
                        dataProfile['isShowEntitlementData'] = false; // : boolean,
                        dataProfile['isShowCertData'] = false; // : boolean

                        return this.buildProfileData(dataProfile);
                        // return this.buildProfileData(data, true, false, false, false);
                    }
                })
            );
    }

    /**
     * Update personal detail
     *
     * @param {UpdatePersonalDetailDTO} data
     * @param {string} userId
     * @returns
     * @memberof UserprofileService
     */
    public updatePersonalDetail(data: UpdatePersonalDetailDTO, userId: string) {

        const modeldata = new UserInfoModel();
        modeldata.USER_INFO_GUID = data.id;
        modeldata.NICKNAME = data.nickname;
        modeldata.PROPERTIES_XML = this.xmlParserService.convertJsonToXML(data);
        modeldata.UPDATE_TS = new Date().toISOString();
        modeldata.UPDATE_USER_GUID = userId;

        const resource = new Resource(new Array());
        resource.resource.push(modeldata);

        return this.userInfoService.updateByModel(resource, [], [], []);
    }

    //#endregion


    //#region EMPLOYMENT DETAIL

    /**
     * get employment detail
     *
     * @param {string[]} filters
     * @returns
     * @memberof UserprofileService
     */
    public getEmploymentDetail(filters: string[]) {
        return this.userInfoService.findByFilterV2([], filters)
            .pipe(
                map(res => {
                    const data: UserInfoModel = res[0];

                    if (data) {
                        let dataProfile = new Object;

                        dataProfile['data'] = data; // : UserInfoModel,
                        dataProfile['isShowPersonalData'] = false; // : boolean,
                        dataProfile['isShowEmploymentData'] = true; // : boolean,
                        dataProfile['isShowEntitlementData'] = false; // : boolean,
                        dataProfile['isShowCertData'] = false; // : boolean

                        return this.buildProfileData(dataProfile);
                        // return this.buildProfileData(data, false, true, false, false);
                    }
                })
            )
    }

    /**
     * update employmemnt detail
     *
     * @param {UpdateEmploymentDetailDTO} data
     * @param {string} userId
     * @returns
     * @memberof UserprofileService
     */
    public updateEmploymentDetail(data: UpdateEmploymentDetailDTO, userId: string) {
        // console.log('this is employment update');
        const modelData = new UserInfoModel();

        modelData.USER_INFO_GUID = data.id;

        modelData.PERSONAL_ID = data.employeeNumber;
        modelData.DESIGNATION = data.designation;
        modelData.DEPARTMENT = data.department;
        modelData.BRANCH = data.branch;
        modelData.DIVISION = data.division;
        modelData.MANAGER_USER_GUID = data.reportingTo;

        modelData.JOIN_DATE = data.dateOfJoin;
        modelData.RESIGNATION_DATE = data.dateOfResign;
        modelData.CONFIRMATION_DATE = data.dateOfConfirmation;

        modelData.EMPLOYEE_STATUS = data.employmentStatus;
        modelData.EMPLOYEE_TYPE = data.employmentType;

        modelData.BANK = data.bankAccountName;
        modelData.PR_ACCOUNT_NUMBER = data.bankAccountNumber;
        modelData.PR_EPF_NUMBER = data.epfNumber;
        modelData.PR_INCOMETAX_NUMBER = data.incomeTaxNumber;

        modelData.UPDATE_TS = new Date().toISOString();
        modelData.UPDATE_USER_GUID = userId;

        const resource = new Resource(new Array());

        resource.resource.push(modelData);

        return this.userInfoService.updateByModel(resource, [], [], []);
    }

    //#region ENTITLEMENT DETAIL

    /**
     * get entitlement detail
     *
     * @param {*} tenant_guid
     * @param {*} user_guid
     * @returns
     * @memberof UserprofileService
     */
    public getEntitlementDetail(tenant_guid, user_guid) {
        return this.entitlementDetailService.getEntitlementList(tenant_guid, user_guid);
    }

    //#endregion


    //#region CERTIFICATION DETAIL

    /**
     * Get certification detail
     *
     * @param {string[]} filters
     * @returns
     * @memberof UserprofileService
     */
    public getCertificationDetail(filters: string[]) {
        return this.userInfoService.findByFilterV2([], filters)
            .pipe(
                map(res => {
                    const data: UserInfoModel = res[0];

                    if (data) {
                        let dataProfile = new Object;

                        dataProfile['data'] = data; // : UserInfoModel,
                        dataProfile['isShowPersonalData'] = false; // : boolean,
                        dataProfile['isShowEmploymentData'] = false; // : boolean,
                        dataProfile['isShowEntitlementData'] = false; // : boolean,
                        dataProfile['isShowCertData'] = true; // : boolean

                        return this.buildProfileData(dataProfile);
                        // return this.buildProfileData(data, false, false, false, true);
                    }
                })
            )
    }

    //#endregion

    /**
     * Build profile data json
     *
     * @private
     * @param {UserInfoModel} data
     * @param {boolean} isShowPersonalData
     * @param {boolean} isShowEmploymentData
     * @param {boolean} isShowEntitlementData
     * @param {boolean} isShowCertData
     * @returns
     * @memberof UserprofileService
     */
    private buildProfileData( dataProfile:any
        ) {
            // console.log(dataProfile);
        let data = dataProfile.data;
        let isShowPersonalData = dataProfile.isShowPersonalData;
        let isShowEmploymentData = dataProfile.isShowEmploymentData;
        let isShowEntitlementData = dataProfile.isShowEntitlementData;
        let isShowCertData = dataProfile.isShowCertData;

        const userProfileData = new UserProfileDTO();

        userProfileData.id = data.USER_INFO_GUID;
        userProfileData.userId = data.USER_GUID;
        userProfileData.employeeName = data.FULLNAME;
        userProfileData.employeeDesignation = data.DESIGNATION;
        userProfileData.employeeLocation = data.TENANT_COMPANY_GUID;
        userProfileData.employeeDepartment = data.DEPARTMENT;
        userProfileData.calendarId = data.CALENDAR_GUID;
        userProfileData.tenantId = data.TENANT_GUID;

        if (data.PROPERTIES_XML) {
            this.personaldetailProcess(data, isShowPersonalData, isShowCertData, userProfileData);
        }

        if (isShowEmploymentData) {
            const employmentDetail = new EmploymentDetailDTO();

            //process the employment data
            employmentDetail.department = data.DEPARTMENT;
            employmentDetail.designation = data.DESIGNATION;;
            employmentDetail.workLocation = "Kuala Lumpur, Malaysia"
            employmentDetail.employeeNumber = data.PERSONAL_ID;
            employmentDetail.employmentStatus = data.EMPLOYEE_STATUS.toString();
            employmentDetail.employmentType = data.EMPLOYEE_TYPE.toString();
            employmentDetail.reportingTo = data.MANAGER_USER_GUID;
            employmentDetail.userRole = "Employee";
            employmentDetail.dateOfJoin = data.JOIN_DATE;
            employmentDetail.dateOfConfirmation = data.CONFIRMATION_DATE;
            employmentDetail.dateOfResign = data.RESIGNATION_DATE;
            employmentDetail.yearOfService = this.serviceYearCalcService.calculateEmployeeServiceYear(new Date(data.JOIN_DATE)) + " Years";
            employmentDetail.epfNumber = data.PR_EPF_NUMBER;
            employmentDetail.incomeTaxNumber = data.PR_INCOMETAX_NUMBER;
            employmentDetail.bankAccountName = data.BANK;
            employmentDetail.bankAccountNumber = data.PR_ACCOUNT_NUMBER;

            userProfileData.employmentDetail = employmentDetail;
        }

        if (isShowEntitlementData) {
            userProfileData.entitlementDetail = [];
        }

        return userProfileData;

    }

    /**
     * get personal detail refactor
     *
     * @param {UserInfoModel} data
     * @param {boolean} isShowPersonalData
     * @param {boolean} isShowCertData
     * @param {*} userProfileData
     * @memberof UserprofileService
     */
    public personaldetailProcess(data: UserInfoModel, isShowPersonalData: boolean, isShowCertData: boolean, userProfileData) {
        //process the personal detail
        const parseXMLtoJSON: PersonalDetailXML = this.xmlParserService.convertXMLToJson(data.PROPERTIES_XML);

        if (isShowPersonalData) {
            this.personaldataProcess(parseXMLtoJSON, userProfileData);
        }

        if (isShowCertData) {
            userProfileData.awardCertification = [];
        }
    }

    //loop data for personal detail
    /**
     * Loop data for personal detail
     *
     * @param {*} parseXMLtoJSON
     * @param {*} userProfileData
     * @memberof UserprofileService
     */
    public personaldataProcess(parseXMLtoJSON, userProfileData) {
        const userPersonalDetail = new UserPersonalDetailDTO();
        for (var j in parseXMLtoJSON) {
            var sub_key = j;
            var sub_val = parseXMLtoJSON[j];

            if (sub_key == 'id') { continue; }

            this.doProcess(sub_key, sub_val, userPersonalDetail);
        }
        userProfileData.personalDetail = userPersonalDetail;
    }

    //change key or substitute value for personaldata
    /**
     * change key or substitute value for personaldata
     *
     * @param {*} sub_key
     * @param {*} sub_val
     * @param {*} userPersonalDetail
     * @memberof UserprofileService
     */
    public doProcess(sub_key, sub_val, userPersonalDetail) {
        if (sub_key == 'gender') { sub_val = sub_val == 1 ? 'Male' : 'Female'; }
        if (sub_key == 'maritalStatus') { sub_val = sub_val == 1 ? 'Married' : 'Single'; }
        if (sub_key == 'address1') { sub_key = 'residentialAddress1'; }
        if (sub_key == 'address2') { sub_key = 'residentialAddress2'; }
        if (sub_key == 'emergencyContact') { sub_key = 'emergencyContactNumber'; }

        userPersonalDetail[sub_key] = sub_val;
    }

    /**
     * Join text method
     *
     * @private
     * @param {string[]} data
     * @returns
     * @memberof UserprofileService
     */
    private joinText(data: string[]) {
        return data.join(",");
    }



}
