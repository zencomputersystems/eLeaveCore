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
    @ApiModelProperty()
    @IsNotEmpty()
    designationId: string;

    /**
     * Data user employee - company id
     *
     * @type {string}
     * @memberof UserEmployeeDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    companyId: string;

    /**
     * Data user employee - department id
     *
     * @type {string}
     * @memberof UserEmployeeDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    departmentId: string;

    /**
     * Data user employee - join date
     *
     * @type {Date}
     * @memberof UserEmployeeDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    joinDate: Date;

    /**
     * Data user employee - confirmation date
     *
     * @type {Date}
     * @memberof UserEmployeeDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    confirmationDate: Date;

    /**
     * Data user employee - resignation date
     *
     * @type {Date}
     * @memberof UserEmployeeDTO
     */
    @ApiModelProperty()
    resignationDate: Date;

    /**
     * Data user employee - email id
     *
     * @type {string}
     * @memberof UserEmployeeDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    emailId: string;

    /**
     * Data user employee - branch id
     *
     * @type {string}
     * @memberof UserEmployeeDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    branchId: string;

    /**
     * Data user employee - role id
     *
     * @type {string}
     * @memberof UserEmployeeDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    roleId: string;

    /**
     * Data user employee - reporting to id
     *
     * @type {string}
     * @memberof UserEmployeeDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    reportingToId: string;

    /**
     * Data user employee - calendar id
     *
     * @type {string}
     * @memberof UserEmployeeDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    calendarId: string;

    /**
     * Data  user employee - employment status
     *
     * @type {number}
     * @memberof UserEmployeeDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    employmentStatus: number;

    /**
     * Data user employee - cost centre id
     *
     * @type {string}
     * @memberof UserEmployeeDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    costCentreId: string;
}
