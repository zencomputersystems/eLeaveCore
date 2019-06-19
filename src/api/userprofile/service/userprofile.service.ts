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
 *
 *
 * @export
 * @class UserprofileService
 */
@Injectable()
export class UserprofileService {

    constructor(
        private readonly userInfoService: UserInfoService,
        private readonly userprofileDBService: UserprofileDbService,
        private readonly xmlParserService: XMLParserService,
        private readonly entitlementDetailService: UserLeaveEntitlementService,
        private readonly serviceYearCalcService: ServiceYearCalc) { }

    public getList(filters: string[]) {
        return this.userprofileDBService.findByFilterV2([], filters)
            .pipe(
                map(res => {
                    const userArray = new Array();

                    res.forEach(element => {

                        userArray.push(
                            new UserprofileListDTO(
                                element.USER_INFO_GUID,
                                element.USER_GUID,
                                element.PERSONAL_ID == null ? '' : element.PERSONAL_ID,
                                element.FULLNAME,
                                element.DESIGNATION,
                                element.EMAIL,
                                new Access()
                            ));

                    });

                    return userArray;
                })
            );
    }

    // Get User Detail
    /**
     * usage : userprofile service get by id or own
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
                        return this.buildProfileData(data, true, true, true, true);
                    }
                })
            )

    }

    //#region PERSONAL DETAIL

    public getPersonalDetail(filters: string[]) {
        return this.userInfoService.findByFilterV2([], filters)
            .pipe(
                map(res => {
                    const data: UserInfoModel = res[0];

                    if (data) {
                        return this.buildProfileData(data, true, false, false, false);
                    }
                })
            );
    }

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

    public getEmploymentDetail(filters: string[]) {
        return this.userInfoService.findByFilterV2([], filters)
            .pipe(
                map(res => {
                    const data: UserInfoModel = res[0];

                    if (data) {
                        return this.buildProfileData(data, false, true, false, false);
                    }
                })
            )
    }

    public updateEmploymentDetail(data: UpdateEmploymentDetailDTO, userId: string) {
        console.log('this is employment update');
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

    public getEntitlementDetail(tenant_guid, user_guid) {
        return this.entitlementDetailService.getEntitlementList(tenant_guid, user_guid);
    }

    //#endregion


    //#region CERTIFICATION DETAIL

    public getCertificationDetail(filters: string[]) {
        return this.userInfoService.findByFilterV2([], filters)
            .pipe(
                map(res => {
                    const data: UserInfoModel = res[0];

                    if (data) {
                        return this.buildProfileData(data, false, false, false, true);
                    }
                })
            )
    }

    //#endregion

    private buildProfileData(
        data: UserInfoModel,
        isShowPersonalData: boolean,
        isShowEmploymentData: boolean,
        isShowEntitlementData: boolean,
        isShowCertData: boolean) {

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
    public doProcess(sub_key, sub_val, userPersonalDetail) {
        if (sub_key == 'gender') { sub_val = sub_val == 1 ? 'Male' : 'Female'; }
        if (sub_key == 'maritalStatus') { sub_val = sub_val == 1 ? 'Married' : 'Single'; }
        if (sub_key == 'address1') { sub_key = 'residentialAddress1'; }
        if (sub_key == 'address2') { sub_key = 'residentialAddress2'; }
        if (sub_key == 'emergencyContact') { sub_key = 'emergencyContactNumber'; }

        userPersonalDetail[sub_key] = sub_val;
    }

    private joinText(data: string[]) {
        return data.join(",");
    }



}
