import { ApiModelProperty } from '@nestjs/swagger';

import { IsString } from 'class-validator';

/**
 * Data for Employment base refactor
 *
 * @export
 * @class EmploymentDetailBase
 */
export class EmploymentDetailBase {
    /**
     * Data employment base - work location
     *
     * @type {string}
     * @memberof EmploymentDetailBase
     */
    @ApiModelProperty()
    @IsString()
    workLocation: string;

    /**
     * Data employment base - department
     *
     * @type {string}
     * @memberof EmploymentDetailBase
     */
    @ApiModelProperty()
    @IsString()
    department: string;

    /**
     * Data employment base - branch
     *
     * @type {string}
     * @memberof EmploymentDetailBase
     */
    @ApiModelProperty()
    @IsString()
    branch: string;

    /**
     * Data employment base - division
     *
     * @type {string}
     * @memberof EmploymentDetailBase
     */
    @ApiModelProperty()
    @IsString()
    division: string;

    /**
     * Data employment base - reporting to
     *
     * @type {string}
     * @memberof EmploymentDetailBase
     */
    @ApiModelProperty()
    @IsString()
    reportingTo: string;

    /**
     * Data employment base - bankaccount name
     *
     * @type {string}
     * @memberof EmploymentDetailBase
     */
    @ApiModelProperty()
    @IsString()
    bankAccountName: string;

    /**
     * Data employment base - bank account number
     *
     * @type {string}
     * @memberof EmploymentDetailBase
     */
    @ApiModelProperty()
    @IsString()
    bankAccountNumber: string;

    /**
     * Data employment base - epf number
     *
     * @type {string}
     * @memberof EmploymentDetailBase
     */
    @ApiModelProperty()
    @IsString()
    epfNumber: string;

    /**
     * Data employment base - income tax number
     *
     * @type {string}
     * @memberof EmploymentDetailBase
     */
    @ApiModelProperty()
    @IsString()
    incomeTaxNumber: string;
}