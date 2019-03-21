import { UserEmergencyContactDetailDTO } from "./xml/user-emergency-contact-detail.dto";
import { UserEducationDetailDTO } from "./xml/user-education-detail.dto";
import { UserFamilyDTO } from "./xml/user-family.dto";

export class UserPersonalDetailDTO {
    nric: string;
    nickname: string;
    dob: string;
    gender: string;
    maritalStatus: string;
    race: string;
    religion: string;
    nationality: string;
    phoneNumber: string;
    workPhoneNumber: string;
    emailAddress: string;
    workEmailAddress: string;
    residentialAddress: string;
    emergencyContactNumber: UserEmergencyContactDetailDTO;
    education: UserEducationDetailDTO;
    family: UserFamilyDTO;
}