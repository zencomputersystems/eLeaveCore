import { UserEmergencyContactDetailDTO } from "./xml/user-emergency-contact-detail.dto";
import { UserEducationDetailDTO } from "./xml/user-education-detail.dto";
import { UserFamilyDTO } from "./xml/user-family.dto";
import { IsNotEmpty, IsISO8601 } from "class-validator";

export class UserPersonalDetailDTO {

    constructor() {
        this.nric = "";
        this.nickname = "";
        this.dob = new Date();
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

    @IsNotEmpty()
    nric: string;

    @IsNotEmpty()
    nickname: string;

    @IsNotEmpty()
    @IsISO8601()
    dob: Date;

    @IsNotEmpty()
    gender: string;

    @IsNotEmpty()
    maritalStatus: string;

    @IsNotEmpty()
    race: string;

    @IsNotEmpty()
    religion: string;

    @IsNotEmpty()
    nationality: string;

    @IsNotEmpty()
    phoneNumber: string;

    workPhoneNumber: string;

    @IsNotEmpty()
    emailAddress: string;

    @IsNotEmpty()
    workEmailAddress: string;

    @IsNotEmpty()
    residentialAddress1: string;

    residentialAddress2: string;

    @IsNotEmpty()
    city: string;

    @IsNotEmpty()
    state: string;

    @IsNotEmpty()
    country: string;

    @IsNotEmpty()
    postcode: string;

    emergencyContactNumber: UserEmergencyContactDetailDTO;
    education: UserEducationDetailDTO;
    family: UserFamilyDTO;
}