import { IsNotEmpty, IsEmail } from "class-validator";

export class UserCsvDto {
    readonly USER_GUID: string;

    @IsNotEmpty()
    @IsEmail()
    readonly STAFF_EMAIL: string;

    readonly STAFF_ID: string;

    @IsNotEmpty()
    readonly FULLNAME: string;

    readonly IC_NUMBER: string;

    readonly DOB: string;

    readonly GENDER: string;

    readonly PHONE_NUMBER: string;

    readonly COMPANY_NUMBER: string;

    readonly MARITAL_STATUS: string;

    readonly ADDRESS: string;

    readonly POSTCODE: string;

    readonly STATE: string;

    readonly COUNTRY: string;

    readonly DESIGNATION: string;

    DEPARTMENT: string;

    COST_CENTRE: string;

    readonly COMPANY: string;

    BRANCH: string;

    readonly JOIN_DATE: string;

    readonly CONFIRMATION_DATE: string;

    readonly RESIGNATION_DATE: string;

    readonly SUPERIOR_EMAIL: string;

}