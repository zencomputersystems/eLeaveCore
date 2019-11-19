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
    @ApiModelProperty({ description: 'User info guid', example: '0051f8ef-00aa-1543-08ee-bddb6a00524e' })
    @IsNotEmpty()
    @IsString()
    id: string;

    /**
     * Data update employment detail - employee number
     *
     * @type {string}
     * @memberof UpdateEmploymentDetailDTO
     */
    @ApiModelProperty({ description: 'Personal employee number', example: '941229-10-5367' })
    @IsNotEmpty()
    @IsString()
    employeeNumber: string;

    /**
     * Data update employment detail - designation
     *
     * @type {string}
     * @memberof UpdateEmploymentDetailDTO
     */
    @ApiModelProperty({ description: 'Designation', example: 'Service Desk Consultant' })
    @IsNotEmpty()
    @IsString()
    designation: string;

    /**
     * Data update employment detail - employment type
     *
     * @type {string}
     * @memberof UpdateEmploymentDetailDTO
     */
    @ApiModelProperty({ description: 'Employee type (Temporary,Permanent)', example: 'Permanent' })
    @IsNotEmpty()
    @IsString()
    employmentType: string;

    /**
     * Data update employment detail - employment status
     *
     * @type {string}
     * @memberof UpdateEmploymentDetailDTO
     */
    @ApiModelProperty({ description: 'Employee status (Confirmed,Terminated,Probation)', example: 'Confirmed' })
    @IsNotEmpty()
    @IsString()
    employmentStatus: string;

    /**
     * Data update employment detail - date of join
     *
     * @type {Date}
     * @memberof UpdateEmploymentDetailDTO
     */
    @ApiModelProperty({ description: 'Date of join', example: '2019-09-09' })
    @IsNotEmpty()
    @IsISO8601()
    dateOfJoin: Date;

    /**
     * Data update employment detail - date of confirmation
     *
     * @type {Date}
     * @memberof UpdateEmploymentDetailDTO
     */
    @ApiModelProperty({ description: 'Confirmation date', example: '2019-10-09' })
    @ValidateIf(x => x.dateOfConfirmation != "")
    @IsISO8601()
    dateOfConfirmation: Date;

    /**
     * Data update employment detail - date of resign
     *
     * @type {Date}
     * @memberof UpdateEmploymentDetailDTO
     */
    @ApiModelProperty({ description: 'Date of resign', example: '2019-12-09' })
    @ValidateIf(x => x.dateOfResign != "")
    @IsISO8601()
    dateOfResign: Date;

}