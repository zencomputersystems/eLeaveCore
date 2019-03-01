import { IsNotEmpty } from "class-validator";

export class UserCertificationDTO {
    @IsNotEmpty()
    certificationName: string;

    @IsNotEmpty()
    certificationEnrollYear: number;

    @IsNotEmpty()
    certificationGraduateYear: number;

    @IsNotEmpty()
    certificationAttachment: string;
}