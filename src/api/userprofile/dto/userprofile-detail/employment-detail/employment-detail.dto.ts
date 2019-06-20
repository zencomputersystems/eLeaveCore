import { IsString, IsISO8601 } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { EmploymentDetailBase } from './employment-detail-base.dto';

/**
 *
 *
 * @export
 * @class EmploymentDetailDTO
 */
export class EmploymentDetailDTO extends EmploymentDetailBase {
    @ApiModelProperty()
    @IsString()
    employeeNumber: string;

    @ApiModelProperty()
    @IsString()
    designation: string;

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

}