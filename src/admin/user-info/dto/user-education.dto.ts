import { IsNotEmpty, IsNumber } from "class-validator";

export class UserEducationDTO {
    @IsNotEmpty()
    qualificationLevel: string;

    @IsNotEmpty()
    major: string;

    @IsNotEmpty()
    university: string;

    @IsNotEmpty()
    @IsNumber()
    year: number;
}