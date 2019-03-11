import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UserEducationDTO {
    @IsNotEmpty()
    qualificationLevel: string;

    @IsNotEmpty()
    major: string;

    @IsNotEmpty()
    university: string;

    @IsNotEmpty()
    @IsString()
    year: string;
}