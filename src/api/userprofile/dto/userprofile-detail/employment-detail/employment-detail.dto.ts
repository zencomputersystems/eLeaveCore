import { IsString, IsISO8601 } from "class-validator";

export class EmploymentDetailDTO {
    @IsString()
    employeeNumber: string;

    @IsString()
    designation: string;

    @IsString()
    workLocation: string;

    @IsString()
    department: string;

    @IsString()
    branch: string;

    @IsString()
    division: string;

    @IsString()
    reportingTo: string;

    @IsISO8601()
    dateOfJoin: Date;

    @IsISO8601()
    dateOfConfirmation: Date;

    @IsISO8601()
    dateOfResign: Date;

    @IsString()
    yearOfService: string;

    @IsString()
    employmentType: string;

    @IsString()
    employmentStatus: string;
    
    @IsString()
    userRole: string;

    @IsString()
    bankAccountName: string;

    @IsString()
    bankAccountNumber: string;
    
    @IsString()
    epfNumber: string;

    @IsString()
    incomeTaxNumber: string;

    
}