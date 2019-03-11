import { IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { UserEmergencyContactDetailDTO } from "./user-emergency-contact-detail.dto";
import { UserEducationDetailDTO } from "./user-education-detail.dto";
import { UserFamilyDTO } from "./user-family.dto";


export class PersonalDetailXML {
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsString()
    nickname: string;

    @IsNotEmpty()
    @IsString()
    dob: string;

    @IsNotEmpty()
    @IsNumber()
    gender: number;

    @IsNotEmpty()
    @IsNumber()
    maritalStatus: number;

    @IsNotEmpty()
    @IsString()
    race: string;

    @IsNotEmpty()
    @IsString()
    religion: string;

    @IsNotEmpty()
    @IsString()
    nationality: string;

    @IsNotEmpty()
    @IsString()
    phoneNumber: string;

    @IsNotEmpty()
    @IsString()
    workPhoneNumber: string;

    @IsNotEmpty()
    @IsString()
    emailAddress: string;

    @IsNotEmpty()
    @IsString()
    workEmailAddress: string;

    @IsNotEmpty()
    @IsString()
    address1: string;

    @IsString()
    address2: string;

    @IsNotEmpty()
    @IsString()
    postcode: string;

    @IsNotEmpty()
    @IsString()
    city: string;

    @IsNotEmpty()
    @IsString()
    state: string;

    @IsNotEmpty()
    @IsString()
    country: string;

    @Type(() => UserEmergencyContactDetailDTO)
    @ValidateNested()
    @IsNotEmpty()
    emergencyContact: UserEmergencyContactDetailDTO;

    // education info
    @Type(() => UserEducationDetailDTO)
    @ValidateNested()
    education: UserEducationDetailDTO;

    @Type(() => UserFamilyDTO)
    @ValidateNested()
    family: UserFamilyDTO
}