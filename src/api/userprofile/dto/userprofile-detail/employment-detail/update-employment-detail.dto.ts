import { IsString, IsNotEmpty, IsNumber, IsISO8601, ValidateIf, Validate } from 'class-validator';
import { ReportingToValidator } from 'src/common/validator/reportingToValidator';
import { ApiModelProperty } from '@nestjs/swagger';
import { EmploymentDetailBase } from './employment-detail-base.dto';

/**
 * Data update employment detail
 *
 * @export
 * @class UpdateEmploymentDetailDTO
 */
export class UpdateEmploymentDetailDTO extends EmploymentDetailBase {
    /**
     * Data update employment detail - id
     *
     * @type {string}
     * @memberof UpdateEmploymentDetailDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    id: string;

    /**
     * Data update employment detail - employee number
     *
     * @type {string}
     * @memberof UpdateEmploymentDetailDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    employeeNumber: string;

    /**
     * Data update employment detail - designation
     *
     * @type {string}
     * @memberof UpdateEmploymentDetailDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    designation: string;

    /**
     * Data update employment detail - employment type
     *
     * @type {string}
     * @memberof UpdateEmploymentDetailDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    employmentType: string;

    /**
     * Data update employment detail - employment status
     *
     * @type {number}
     * @memberof UpdateEmploymentDetailDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    @IsNumber()
    employmentStatus: number;

    /**
     * Data update employment detail - date of join
     *
     * @type {Date}
     * @memberof UpdateEmploymentDetailDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    @IsISO8601()
    dateOfJoin: Date;

    /**
     * Data update employment detail - date of confirmation
     *
     * @type {Date}
     * @memberof UpdateEmploymentDetailDTO
     */
    @ApiModelProperty()
    @ValidateIf(x => x.dateOfConfirmation != "")
    @IsISO8601()
    dateOfConfirmation: Date;

    /**
     * Data update employment detail - date of resign
     *
     * @type {Date}
     * @memberof UpdateEmploymentDetailDTO
     */
    @ApiModelProperty()
    @ValidateIf(x => x.dateOfResign != "")
    @IsISO8601()
    dateOfResign: Date;

}