import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class UpdateEmploymentDetailDTO {
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsString()
    employeeNumber: string;

    @IsNotEmpty()
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

    @IsNotEmpty()
    @IsString()
    reportingTo: string;
    
    @IsNotEmpty()
    @IsNumber()
    employmentType: number;

    @IsNotEmpty()
    @IsNumber()
    employmentStatus: number;

    @IsNotEmpty()
    @IsString()
    dateOfJoin: string;

    @IsString()
    dateOfConfirmation: string;

    @IsString()
    dateOfResign: string;

    @IsString()
    bankAccountName: string;

    @IsString()
    bankAccountNumber: string;
    
    @IsString()
    epfNumber: string;

    @IsString()
    incomeTaxNumber: string;
}