import { IsNotEmpty } from "class-validator";

export class UserEmployeeDTO {
    @IsNotEmpty()
    readonly designation: string;

    @IsNotEmpty()
    readonly company: string;

    @IsNotEmpty()
    readonly department: string;

    @IsNotEmpty()
    readonly joinDate: Date;

    @IsNotEmpty()
    readonly confirmationDate: Date;

    @IsNotEmpty()
    readonly resignationDate: Date;
    
    @IsNotEmpty()
    readonly emailId: string;

    @IsNotEmpty()
    readonly branch: string;

    @IsNotEmpty()
    readonly role: string;

    @IsNotEmpty()
    readonly reportingTo: string;

    @IsNotEmpty()
    readonly calendar: string;

    @IsNotEmpty()
    readonly employmentStatus: string;

    @IsNotEmpty()
    readonly costCentre: string;
}