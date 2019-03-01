import { IsNotEmpty } from "class-validator";

export class UserSpouseDTO {
    @IsNotEmpty()
    spouseName: string;

    @IsNotEmpty()
    spouseIdentificationNumber: string;
}