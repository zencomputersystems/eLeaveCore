import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * User's details as an employee
 *
 * @export
 * @class UserEmployeeDTO
 */
export class UserEmployeeDTO {
    /**
     * Data user employee - designation id
     *
     * @type {string}
     * @memberof UserEmployeeDTO
     */
    @ApiModelProperty({ description: 'Designation id', example: 'Solutions Developer' })
    @IsNotEmpty()
    designationId: string;

    /**
     * Data user employee - company id
     *
     * @type {string}
     * @memberof UserEmployeeDTO
     */
    @ApiModelProperty({ description: 'Company id', example: 'Zen Computer System'})
    @IsNotEmpty()
    companyId: string;

    /**
     * Data user employee - department id
     *
     * @type {string}
     * @memberof UserEmployeeDTO
     */
    @ApiModelProperty({ description: 'Department id', example: 'Research & Development' })
    @IsNotEmpty()
    departmentId: string;

    /**
     * Data user employee - join date
     *
     * @type {Date}
     * @memberof UserEmployeeDTO
     */
    @ApiModelProperty({ description: 'date of join', example: '2019-04-01' })
    @IsNotEmpty()
    joinDate: Date;

    /**
     * Data user employee - confirmation date
     *
     * @type {Date}
     * @memberof UserEmployeeDTO
     */
    @ApiModelProperty({ description: 'Confirmation date', example: '2019-07-01' })
    @IsNotEmpty()
    confirmationDate: Date;

    /**
     * Data user employee - resignation date
     *
     * @type {Date}
     * @memberof UserEmployeeDTO
     */
    @ApiModelProperty({ description: 'Resignation date', example: '2019-08-01' })
    resignationDate: Date;

    /**
     * Data user employee - email id
     *
     * @type {string}
     * @memberof UserEmployeeDTO
     */
    @ApiModelProperty({ description: 'Email id', example: 'example@zen.com.my' })
    @IsNotEmpty()
    emailId: string;

    /**
     * Data user employee - branch id
     *
     * @type {string}
     * @memberof UserEmployeeDTO
     */
    @ApiModelProperty({ description: 'Branch id', example: 'Cyberjaya' })
    @IsNotEmpty()
    branchId: string;

    /**
     * Data user employee - role id
     *
     * @type {string}
     * @memberof UserEmployeeDTO
     */
    @ApiModelProperty({ description: 'Role id', example: 'guiYG^guygI&6gGI&Giuyg' })
    @IsNotEmpty()
    roleId: string;

    /**
     * Data user employee - reporting to id
     *
     * @type {string}
     * @memberof UserEmployeeDTO
     */
    @ApiModelProperty({ description: 'Reporting to manager id', example: 'JHGI67hgd2378hgdsaBH' })
    @IsNotEmpty()
    reportingToId: string;

    /**
     * Data user employee - calendar id
     *
     * @type {string}
     * @memberof UserEmployeeDTO
     */
    @ApiModelProperty({ description: 'Calendar id', example: 'UHGI87tgIGYUD7hdwhjb' })
    @IsNotEmpty()
    calendarId: string;

    /**
     * Data  user employee - employment status
     *
     * @type {number}
     * @memberof UserEmployeeDTO
     */
    @ApiModelProperty({ description: 'Employment status', example: 2 })
    @IsNotEmpty()
    employmentStatus: number;

    /**
     * Data user employee - cost centre id
     *
     * @type {string}
     * @memberof UserEmployeeDTO
     */
    @ApiModelProperty({ description: 'Cost centre id', example: 'HJBOUBd8w7dJDSHidhw' })
    @IsNotEmpty()
    costCentreId: string;
}
