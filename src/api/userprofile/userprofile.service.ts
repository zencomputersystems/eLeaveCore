import { Injectable } from '@nestjs/common';
import { UserInfoService } from 'src/admin/user-info/user-info.service';
import { map } from 'rxjs/operators';
import { XMLParserService } from 'src/common/helper/xml-parser.service';
import { UserInfoModel } from 'src/admin/user-info/model/user-info.model';
import { UserPersonalDetailDTO } from './dto/userprofile-detail/personal-detail/user-personal-detail.dto';
import { UserProfileDTO } from './dto/userprofile-detail/userprofile.dto';
import { UserDto } from 'src/admin/user-info/dto/user.dto';
import { EmploymentDetailDTO } from './dto/userprofile-detail/employment-detail/employment-detail.dto';
import { leaveEntitlementMock } from './mockdata/leave-entitlement';
import { EntitlementDetailDTO } from './dto/userprofile-detail/entitlement-detail/entitlement-detail.dto';

@Injectable()
export class UserprofileService {

    constructor(
        private readonly userInfoService: UserInfoService,
        private readonly xmlParserService: XMLParserService) {}

    public getData() {
        return this.userInfoService.findByFilter([],[]);
    }

    // Get User Detail
    public getDetail(id: string, tenantId: string) {

        const filters = ['(TENANT_GUID='+tenantId+')','(USER_GUID='+id+')'];

        return this.userInfoService.findByFilter([],filters)
                .pipe(
                    map(res => {
                        
                        if(res.status==200) {

                            const data: UserInfoModel = res.data.resource[0];

                            if(data) {

                                const userProfileData = new UserProfileDTO();
                                const userPersonalDetail = new UserPersonalDetailDTO();
                                const employmentDetail = new EmploymentDetailDTO();

                                userProfileData.id = data.USER_INFO_GUID;
                                userProfileData.userId = data.USER_GUID;
                                userProfileData.employeeName = data.FULLNAME;
                                userProfileData.employeeDesignation = data.DESIGNATION_GUID;
                                userProfileData.employeeLocation = data.TENANT_COMPANY_GUID;
                            
                                if(data.XML) {
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

                                userProfileData.entitlementDetail = leaveEntitlementMock;

                
                                return userProfileData;
                            }
                        }
                    })
                )
    }

    private joinText(data: string[]) {
        return data.join(",");
    }

}
