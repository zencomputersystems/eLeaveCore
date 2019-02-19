import { IsNotEmpty, IsNumber } from "class-validator";

export class UserEducationDTO {
    @IsNotEmpty()
    readonly qualificationLevel: string;

    @IsNotEmpty()
    readonly major: string;

    @IsNotEmpty()
    readonly university: string;

    @IsNotEmpty()
    @IsNumber()
    readonly year: number;
}