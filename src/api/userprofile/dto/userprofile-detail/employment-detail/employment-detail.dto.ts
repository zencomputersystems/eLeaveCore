import { IsString, IsISO8601 } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { EmploymentDetailBase } from './employment-detail-base.dto';

/**
 *Data for employment detail
 *
 * @export
 * @class EmploymentDetailDTO
 */
export class EmploymentDetailDTO extends EmploymentDetailBase {
    /**
     * Data employment detail - employee number
     *
     * @type {string}
     * @memberof EmploymentDetailDTO
     */
    @ApiModelProperty()
    @IsString()
    employeeNumber: string;

    /**
     * Data employment detail - designation
     *
     * @type {string}
     * @memberof EmploymentDetailDTO
     */
    @ApiModelProperty()
    @IsString()
    designation: string;

    /**
     * Data employment detail - date of join
     *
     * @type {Date}
     * @memberof EmploymentDetailDTO
     */
    @ApiModelProperty()
    @IsISO8601()
    dateOfJoin: Date;

    /**
     * Data employment detail - date of confirmation
     *
     * @type {Date}
     * @memberof EmploymentDetailDTO
     */
    @ApiModelProperty()
    @IsISO8601()
    dateOfConfirmation: Date;

    /**
     * Data employment detail - date of resign
     *
     * @type {Date}
     * @memberof EmploymentDetailDTO
     */
    @ApiModelProperty()
    @IsISO8601()
    dateOfResign: Date;

    /**
     * Data employment detail - year of service
     *
     * @type {string}
     * @memberof EmploymentDetailDTO
     */
    @ApiModelProperty()
    @IsString()
    yearOfService: string;

    /**
     * Data employment detail - employment type
     *
     * @type {string}
     * @memberof EmploymentDetailDTO
     */
    @ApiModelProperty()
    @IsString()
    employmentType: string;

    /**
     * Data employment detail - employment status
     *
     * @type {string}
     * @memberof EmploymentDetailDTO
     */
    @ApiModelProperty()
    @IsString()
    employmentStatus: string;

    /**
     * Data employment detail - user role
     *
     * @type {string}
     * @memberof EmploymentDetailDTO
     */
    @ApiModelProperty()
    @IsString()
    userRole: string;

}