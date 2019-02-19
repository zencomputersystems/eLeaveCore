import { IsNotEmpty } from "class-validator";

export class UserSpouseDTO {
    @IsNotEmpty()
    readonly spouseName: string;

    @IsNotEmpty()
    readonly spouseIdentificationNumber: string;
}