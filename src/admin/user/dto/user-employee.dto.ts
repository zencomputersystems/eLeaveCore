import { IsNotEmpty } from "class-validator";

export class UserEmployeeDTO {
    @IsNotEmpty()
    readonly designationId: string;

    @IsNotEmpty()
    readonly companyId: string;

    @IsNotEmpty()
    readonly departmentId: string;

    @IsNotEmpty()
    readonly joinDate: Date;

    @IsNotEmpty()
    readonly confirmationDate: Date;

    readonly resignationDate: Date;
    
    @IsNotEmpty()
    readonly emailId: string;

    @IsNotEmpty()
    readonly branchId: string;

    @IsNotEmpty()
    readonly roleId: string;

    @IsNotEmpty()
    readonly reportingToId: string;

    @IsNotEmpty()
    readonly calendarId: string;

    @IsNotEmpty()
    readonly employmentStatus: number;

    @IsNotEmpty()
    readonly costCentreId: string;
}