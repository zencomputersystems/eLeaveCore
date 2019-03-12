import { Injectable } from '@nestjs/common';
import { map, switchMap, filter, tap, catchError } from 'rxjs/operators';
import { XMLParserService } from 'src/common/helper/xml-parser.service';
import { UserInfoModel } from 'src/admin/user-info/model/user-info.model';
import { UserPersonalDetailDTO } from './dto/userprofile-detail/personal-detail/user-personal-detail.dto';
import { UserProfileDTO } from './dto/userprofile-detail/userprofile.dto';
import { EmploymentDetailDTO } from './dto/userprofile-detail/employment-detail/employment-detail.dto';
import { leaveEntitlementMock } from './mockdata/leave-entitlement';
import { UserprofileListDTO } from './dto/userprofile-list/userprofile-list.dto';
import { UserprofileDbService } from './db/userprofile.db.service';
import { UpdatePersonalDetailDTO } from './dto/userprofile-detail/personal-detail/update-personal-detail.dto';
import { UserInfoService } from 'src/admin/user-info/user-info.service';
import { Resource } from 'src/common/model/resource.model';
import { UserDto } from 'src/admin/user-info/dto/user.dto';
import { PersonalDetailXML } from './dto/userprofile-detail/personal-detail/xml/personal-detail.xml';


@Injectable()
export class UserprofileService {

    constructor(
        private readonly userInfoService: UserInfoService,
        private readonly userprofileDBService: UserprofileDbService,
        private readonly xmlParserService: XMLParserService) {}

    public getList(filters: string[]) {
        
        return this.userprofileDBService.findByFilter([],filters)
            .pipe(map(res => {
                if(res.status==200) {

                    const userArray = new Array();
                    
                    res.data.resource.forEach(element => {
                        const useritem = new UserprofileListDTO();
                        useritem.id = element.USER_INFO_GUID;
                        useritem.userId = element.USER_GUID;
                        useritem.staffId = element.PERSONAL_ID;
                        useritem.employeeName = element.FULLNAME;
                        useritem.email = element.EMAIL;
                        useritem.designation = element.DESIGNATION;

                        userArray.push(useritem);

                    });

                    return userArray;
                }
            }));
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

    //#region PERSONAL DETAIL

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

    public updatePersonalDetail(data: UpdatePersonalDetailDTO,userId: string) {
        const modeldata = new UserInfoModel();
        modeldata.USER_INFO_GUID = data.id;
        modeldata.NICKNAME = data.nickname;
        modeldata.PROPERTIES_XML = this.xmlParserService.convertJsonToXML(data);
        modeldata.UPDATE_TS = new Date().toISOString();
        modeldata.UPDATE_USER_GUID = userId;

        const resource = new Resource(new Array());
        resource.resource.push(modeldata);

        return this.userInfoService.updateByModel(resource,[],[],[]);
    }

    //#endregion


    //#region EMPLOYMENT DETAIL

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

    public updateEmploymentDetail() {

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
    
        if(data.PROPERTIES_XML&&isShowPersonalData) {
            const userPersonalDetail = new UserPersonalDetailDTO();

            //process the personal detail
            const parseXMLtoJSON: PersonalDetailXML= this.xmlParserService.convertXMLToJson(data.PROPERTIES_XML);

            userPersonalDetail.dob = parseXMLtoJSON.dob;
            userPersonalDetail.emailAddress = parseXMLtoJSON.emailAddress;
            userPersonalDetail.workEmailAddress = parseXMLtoJSON.workEmailAddress;
            userPersonalDetail.gender = parseXMLtoJSON.gender==1?"Male":"Female";
            userPersonalDetail.maritalStatus = parseXMLtoJSON.maritalStatus==1?"Married":"Single";
            userPersonalDetail.residentialAddress = this.joinText([parseXMLtoJSON.address1,parseXMLtoJSON.address2,parseXMLtoJSON.city,parseXMLtoJSON.state,parseXMLtoJSON.country]);
            userPersonalDetail.religion = parseXMLtoJSON.religion;
            userPersonalDetail.nationality = parseXMLtoJSON.nationality;
            userPersonalDetail.phoneNumber = parseXMLtoJSON.phoneNumber;
            userPersonalDetail.race = parseXMLtoJSON.race;
            userPersonalDetail.family = parseXMLtoJSON.family;
            userPersonalDetail.education = parseXMLtoJSON.education;
            userPersonalDetail.emergencyContactNumber = parseXMLtoJSON.emergencyContact;

            userProfileData.personalDetail = userPersonalDetail;
        }

        if(isShowEmploymentData) {
            const employmentDetail = new EmploymentDetailDTO();

            //process the employment data
            employmentDetail.department = data.DEPARTMENT;
            employmentDetail.designation = data.DESIGNATION;;
            employmentDetail.workLocation = "Kuala Lumpur, Malaysia"
            employmentDetail.staffId = "A12334";
            employmentDetail.employmentStatus = data.EMPLOYEE_STATUS.toString();
            employmentDetail.employmentType = data.EMPLOYEE_TYPE.toString();
            employmentDetail.nric = "dddddd";
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
