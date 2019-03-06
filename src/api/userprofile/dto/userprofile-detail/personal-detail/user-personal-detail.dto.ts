import { UserEmergencyContactDTO } from "./user-emergency-contact.dto";
import { EducationDTO } from "./user-education.dto";
import { UserFamilyDTO } from "./user-family.dto";
import { UserBankDTO } from "../employment-detail/user-bank.dto";

export class UserPersonalDetailDTO {
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
    emergencyContactNumber = new Array<any>();
    education = new Array<any>();
    family = new Array<any>();
}