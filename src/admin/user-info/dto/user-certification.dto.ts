import { IsNotEmpty } from "class-validator";

export class UserCertificationDTO {
    @IsNotEmpty()
    readonly certificationName: string;

    @IsNotEmpty()
    readonly certificationEnrollYear: number;

    @IsNotEmpty()
    readonly certificationGraduateYear: number;

    @IsNotEmpty()
    readonly certificationAttachment: string;
}