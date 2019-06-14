import { IsString, IsISO8601 } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

/**
 *
 *
 * @export
 * @class EmploymentDetailDTO
 */
export class EmploymentDetailDTO {
    @ApiModelProperty()
    @IsString()
    employeeNumber: string;

    @ApiModelProperty()
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
    reportingTo: string;

    @ApiModelProperty()
    @IsISO8601()
    dateOfJoin: Date;

    @ApiModelProperty()
    @IsISO8601()
    dateOfConfirmation: Date;

    @ApiModelProperty()
    @IsISO8601()
    dateOfResign: Date;

    @ApiModelProperty()
    @IsString()
    yearOfService: string;

    @ApiModelProperty()
    @IsString()
    employmentType: string;

    @ApiModelProperty()
    @IsString()
    employmentStatus: string;

    @ApiModelProperty()
    @IsString()
    userRole: string;

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