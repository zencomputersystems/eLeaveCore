import { IsString, IsNotEmpty, IsNumber, IsISO8601, ValidateIf, Validate } from "class-validator";
import { ReportingToValidator } from "src/common/validator/reportingToValidator";
import { ApiModelProperty } from "@nestjs/swagger";

/**
 *
 *
 * @export
 * @class UpdateEmploymentDetailDTO
 */
export class UpdateEmploymentDetailDTO {
    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    id: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    employeeNumber: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    designation: string;

    @ApiModelProperty()
    @IsString()
    workLocation: string;

    @ApiModelProperty()
    @IsString()
    department: string;

    @ApiModelProperty()
    @IsString()
    branch: string;

    @ApiModelProperty()
    @IsString()
    division: string;

    @ApiModelProperty()
    @IsString()
    //@Validate(ReportingToValidator)
    reportingTo: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    employmentType: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsNumber()
    employmentStatus: number;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsISO8601()
    dateOfJoin: Date;

    @ApiModelProperty()
    @ValidateIf(x => x.dateOfConfirmation != "")
    @IsISO8601()
    dateOfConfirmation: Date;

    @ApiModelProperty()
    @ValidateIf(x => x.dateOfResign != "")
    @IsISO8601()
    dateOfResign: Date;

    @ApiModelProperty()
    @IsString()
    bankAccountName: string;

    @ApiModelProperty()
    @IsString()
    bankAccountNumber: string;

    @ApiModelProperty()
    @IsString()
    epfNumber: string;

    @ApiModelProperty()
    @IsString()
    incomeTaxNumber: string;
}