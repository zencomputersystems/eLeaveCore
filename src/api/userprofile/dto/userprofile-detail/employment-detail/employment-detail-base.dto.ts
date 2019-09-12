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
    @ApiModelProperty({ description: 'Work Location', example: 'Cyberjaya' })
    @IsString()
    workLocation: string;

    /**
     * Data employment base - department
     *
     * @type {string}
     * @memberof EmploymentDetailBase
     */
    @ApiModelProperty({ description: 'Department name', example: 'Research and Development' })
    @IsString()
    department: string;

    /**
     * Data employment base - branch
     *
     * @type {string}
     * @memberof EmploymentDetailBase
     */
    @ApiModelProperty({ description: 'Branch name', example: 'Cyberjaya' })
    @IsString()
    branch: string;

    /**
     * Data employment base - division
     *
     * @type {string}
     * @memberof EmploymentDetailBase
     */
    @ApiModelProperty({ description: 'Division name', example: 'IT Division' })
    @IsString()
    division: string;

    /**
     * Data employment base - reporting to
     *
     * @type {string}
     * @memberof EmploymentDetailBase
     */
    @ApiModelProperty({ description: 'Manager user guid', example: 'b022d1b1-ff12-9cdf-2272-8c01cb75fbe0' })
    @IsString()
    reportingTo: string;

    /**
     * Data employment base - bankaccount name
     *
     * @type {string}
     * @memberof EmploymentDetailBase
     */
    @ApiModelProperty({ description: 'Bank name', example: 'Cimb Bank Berhad' })
    @IsString()
    bankAccountName: string;

    /**
     * Data employment base - bank account number
     *
     * @type {string}
     * @memberof EmploymentDetailBase
     */
    @ApiModelProperty({ description: 'bank account number', example: '7071516435' })
    @IsString()
    bankAccountNumber: string;

    /**
     * Data employment base - epf number
     *
     * @type {string}
     * @memberof EmploymentDetailBase
     */
    @ApiModelProperty({ description: 'EPF Account number', example: 'TY279FY' })
    @IsString()
    epfNumber: string;

    /**
     * Data employment base - income tax number
     *
     * @type {string}
     * @memberof EmploymentDetailBase
     */
    @ApiModelProperty({ description: 'Income tax number', example: '22170145' })
    @IsString()
    incomeTaxNumber: string;
}