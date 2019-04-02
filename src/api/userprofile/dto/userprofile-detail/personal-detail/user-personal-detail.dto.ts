import { UserEmergencyContactDetailDTO } from "./xml/user-emergency-contact-detail.dto";
import { UserEducationDetailDTO } from "./xml/user-education-detail.dto";
import { UserFamilyDTO } from "./xml/user-family.dto";

export class UserPersonalDetailDTO {

    constructor() {
        this.nric = "";
        this.nickname = "";
        this.dob = "";
        this.gender = "";
        this.maritalStatus = "";
        this.race = "";
        this.religion = "";
        this.nationality = "";
        this.phoneNumber = "";
        this.workPhoneNumber = "";
        this.emailAddress = "";
        this.workEmailAddress = "";
        this.residentialAddress1 = "";
        this.residentialAddress2 = "";
        this.city = "";
        this.postcode = "";
        this.state = "";
        this.country = "";
        
        this.emergencyContactNumber = new UserEmergencyContactDetailDTO();
        this.education = new UserEducationDetailDTO();
        this.family = new UserFamilyDTO();
    }
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
    residentialAddress1: string;
    residentialAddress2: string;
    city: string;
    state: string;
    country: string;
    postcode: string;
    emergencyContactNumber: UserEmergencyContactDetailDTO;
    education: UserEducationDetailDTO;
    family: UserFamilyDTO;
}