import { IsNotEmpty } from "class-validator";

export class UserEmployeeDTO {
    @IsNotEmpty()
    designationId: string;

    @IsNotEmpty()
    companyId: string;

    @IsNotEmpty()
    departmentId: string;

    @IsNotEmpty()
    joinDate: Date;

    @IsNotEmpty()
    confirmationDate: Date;

    resignationDate: Date;
    
    @IsNotEmpty()
    emailId: string;

    @IsNotEmpty()
    branchId: string;

    @IsNotEmpty()
    roleId: string;

    @IsNotEmpty()
    reportingToId: string;

    @IsNotEmpty()
    calendarId: string;

    @IsNotEmpty()
    employmentStatus: number;

    @IsNotEmpty()
    costCentreId: string;
}