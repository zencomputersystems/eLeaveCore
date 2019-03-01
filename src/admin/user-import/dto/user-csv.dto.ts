import { IsNotEmpty, IsEmail } from "class-validator";

export class UserCsvDto {
    
    @IsNotEmpty()
    @IsEmail()
    STAFF_EMAIL: string;

    STAFF_ID: string;

    @IsNotEmpty()
    FULLNAME: string;

    IC_NUMBER: string;

    DOB: string;

    GENDER: string;

    PHONE_NUMBER: string;

    COMPANY_NUMBER: string;

    MARITAL_STATUS: string;

    ADDRESS: string;

    POSTCODE: string;

    STATE: string;

    COUNTRY: string;

    DESIGNATION: string;

    DEPARTMENT: string;

    COST_CENTRE: string;

    COMPANY: string;

    BRANCH: string;

    JOIN_DATE: string;

    CONFIRMATION_DATE: string;

    RESIGNATION_DATE: string;

    SUPERIOR_EMAIL: string;

}