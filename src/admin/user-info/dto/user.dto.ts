import { UserEmployeeDTO } from "./user-employee.dto";
import { IsNotEmpty, ValidateNested } from "class-validator";
import { UserFamilyDTO } from "./user-family.dto";
import { Type } from "class-transformer";
import { UserEducationDetailDTO } from "./user-education-detail.dto";
import { UserCertificationDetailDTO } from "./user-certification-detail.dto";
import { UserEmergencyContactDetailDTO } from "./user-emergency-contact-detail.dto";

export class UserDto {

    @IsNotEmpty()
    employeeId: string;

    @IsNotEmpty()
    employeeName: string;

    @IsNotEmpty()
    phoneNumber: string;

    companyNumber: string;

    @IsNotEmpty()
    maritalStatus: number;

    @IsNotEmpty()
    icNumber: string;

    @IsNotEmpty()
    dob: Date;

    @IsNotEmpty()
    gender: number;

    @IsNotEmpty()
    email: string;

    // residential address info
    @IsNotEmpty()
    address1: string;

    address2: string;

    @IsNotEmpty()
    city: string;

    @IsNotEmpty()
    postcode: string;

    @IsNotEmpty()
    state: string;

    @IsNotEmpty()
    country: string;

    // family info
    @Type(() => UserFamilyDTO)
    @ValidateNested()
    family: UserFamilyDTO[];

    @Type(() => UserEmergencyContactDetailDTO)
    @ValidateNested()
    emergencyContacts: UserEmergencyContactDetailDTO;

    // education info
    @Type(() => UserEducationDetailDTO)
    @ValidateNested()
    education: UserEducationDetailDTO;

    // professional cert info
    @Type(() => UserCertificationDetailDTO)
    @ValidateNested()
    professionalCerts: UserCertificationDetailDTO

    // employee info
    @IsNotEmpty()
    @Type(() => UserEmployeeDTO)
    @ValidateNested()
    employmentDetail: UserEmployeeDTO;

}