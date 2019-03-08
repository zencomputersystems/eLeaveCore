import { Injectable } from '@nestjs/common';
import { UserInfoService } from 'src/admin/user-info/user-info.service';
import { map, switchMap, filter, tap, catchError } from 'rxjs/operators';
import { XMLParserService } from 'src/common/helper/xml-parser.service';
import { UserInfoModel } from 'src/admin/user-info/model/user-info.model';
import { UserPersonalDetailDTO } from './dto/userprofile-detail/personal-detail/user-personal-detail.dto';
import { UserProfileDTO } from './dto/userprofile-detail/userprofile.dto';
import { UserDto } from 'src/admin/user-info/dto/user.dto';
import { EmploymentDetailDTO } from './dto/userprofile-detail/employment-detail/employment-detail.dto';
import { leaveEntitlementMock } from './mockdata/leave-entitlement';
import { AccessLevelValidateService } from 'src/common/helper/access-level-validate.service';
import { Observable } from 'rxjs';


@Injectable()
export class UserprofileService {

    constructor(
        private readonly userInfoService: UserInfoService,
        private readonly xmlParserService: XMLParserService) {}

    public getList(filters: string[]) {
        
        return this.userInfoService.findByFilter([],filters);
    }

    // Get User Detail
    public getDetail(filters:string[]) {

        return this.userInfoService.findByFilter([],filters)
                .pipe(map(res => {
                    if(res.status==200) {

                        const data: UserInfoModel = res.data.resource[0];

                        if(data) {
                            return this.buildProfileData(data,true,true,true,true);
                        }
                    }
                }))
        
    }

    public getPersonalDetail(filters:string[]) {
        return this.userInfoService.findByFilter([],filters)
                .pipe(map(res => {
                    if(res.status==200) {
                        const data: UserInfoModel = res.data.resource[0];

                        if(data) {
                            return this.buildProfileData(data,true,false,false,false);
                        }
                    }
                }));
    }

    public getEmploymentDetail(filters:string[]) {
        return this.userInfoService.findByFilter([],filters)
                .pipe(map(res => {
                    if(res.status==200) {
                        const data: UserInfoModel = res.data.resource[0];

                        if(data) {
                            return this.buildProfileData(data,false,true,false,false);
                        }
                    }
                }))
    }

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
        userProfileData.employeeDesignation = data.DESIGNATION_GUID;
        userProfileData.employeeLocation = data.TENANT_COMPANY_GUID;
    
        if(data.XML&&isShowPersonalData) {
            const userPersonalDetail = new UserPersonalDetailDTO();

            //process the personal detail
            const parseXMLtoJSON: UserDto= this.xmlParserService.convertXMLToJson(data.XML);

            userPersonalDetail.dob = parseXMLtoJSON.dob.toString();
            userPersonalDetail.emailAddress = parseXMLtoJSON.email;
            userPersonalDetail.workEmailAddress = "shafuan1015@gmail.com";
            userPersonalDetail.gender = parseXMLtoJSON.gender==1?"Male":"Female";
            userPersonalDetail.residentialAddress = this.joinText([parseXMLtoJSON.address1,parseXMLtoJSON.address2,parseXMLtoJSON.city,parseXMLtoJSON.state,parseXMLtoJSON.country]);
            userPersonalDetail.religion = "Islam";
            userPersonalDetail.nationality = "Malaysian";
            userPersonalDetail.phoneNumber = parseXMLtoJSON.phoneNumber;
            userPersonalDetail.race = "Malay";
            userPersonalDetail.family = parseXMLtoJSON.family;
            userPersonalDetail.education = parseXMLtoJSON.education.educationDetail;
            userPersonalDetail.emergencyContactNumber = parseXMLtoJSON.emergencyContacts.contact;

            userProfileData.personalDetail = userPersonalDetail;
        }

        if(isShowEmploymentData) {
            const employmentDetail = new EmploymentDetailDTO();

            //process the employment data
            employmentDetail.department = data.DEPT_GUID;
            employmentDetail.employeeDesignation = data.DESIGNATION_GUID;
            employmentDetail.employeeLocation = data.TENANT_COMPANY_GUID;
            employmentDetail.staffId = "A13455";
            employmentDetail.employmentStatus = data.EMPLOYEE_STATUS.toString();
            employmentDetail.employmentType = data.EMPLOYEE_TYPE.toString();
            employmentDetail.icNumber = "543654654354";
            employmentDetail.reportingTo = data.MANAGER_USER_GUID;
            employmentDetail.userRole = "Employee";
            employmentDetail.yearOfService = "3 Years";
            employmentDetail.epfNumber = "A12343";
            employmentDetail.incomeTaxNumber = "C6543-GFD89";
            employmentDetail.bankAccountName = "CIMB BERHAD";
            employmentDetail.bankAccountNumber ="8765434678765";

            userProfileData.employmentDetail = employmentDetail;
        }

        if(isShowEntitlementData) {
            userProfileData.entitlementDetail = leaveEntitlementMock;
        }


        return userProfileData;

    }


    private joinText(data: string[]) {
        return data.join(",");
    }

}
