import { IsString, IsNotEmpty, IsNumber, IsISO8601, ValidateIf, Validate } from "class-validator";
import { ReportingToValidator } from "src/common/validator/reportingToValidator";

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

    @IsString()
    //@Validate(ReportingToValidator)
    reportingTo: string;
    
    @IsNotEmpty()
    @IsString()
    employmentType: string;

    @IsNotEmpty()
    @IsNumber()
    employmentStatus: number;

    @IsNotEmpty()
    @IsISO8601()
    dateOfJoin: Date;

    @ValidateIf(x=>x.dateOfConfirmation!="")
    @IsISO8601()
    dateOfConfirmation: Date;

    @ValidateIf(x=>x.dateOfResign!="")
    @IsISO8601()
    dateOfResign: Date;

    @IsString()
    bankAccountName: string;

    @IsString()
    bankAccountNumber: string;
    
    @IsString()
    epfNumber: string;

    @IsString()
    incomeTaxNumber: string;
}