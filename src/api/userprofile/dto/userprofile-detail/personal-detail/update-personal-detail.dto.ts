import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdatePersonalDetailDTO {
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    dob: string;

    @IsNotEmpty()
    @IsNumber()
    gender: number;

    @IsNotEmpty()
    @IsNumber()
    maritalStatus: number;

    @IsNotEmpty()
    race: string;

    @IsNotEmpty()
    religion: string;

    @IsNotEmpty()
    nationality: string;

    @IsNotEmpty()
    phoneNumber: string;

    @IsNotEmpty()
    workPhoneNumber: string;

    @IsNotEmpty()
    emailAddress: string;

    @IsNotEmpty()
    workEmailAddress: string;

    @IsNotEmpty()
    residentialAddress: string;

    @IsNotEmpty()
    emergencyContactNumber = new Array<any>();

    @IsNotEmpty()
    education = new Array<any>();

    @IsNotEmpty()
    family = new Array<any>();
}