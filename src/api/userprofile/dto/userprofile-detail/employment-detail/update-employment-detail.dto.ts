import { IsString, IsNotEmpty, IsNumber, IsISO8601, ValidateIf, Validate } from 'class-validator';
import { ReportingToValidator } from 'src/common/validator/reportingToValidator';
import { ApiModelProperty } from '@nestjs/swagger';
import { EmploymentDetailBase } from './employment-detail-base.dto';

/**
 *
 *
 * @export
 * @class UpdateEmploymentDetailDTO
 */
export class UpdateEmploymentDetailDTO extends EmploymentDetailBase {
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

}