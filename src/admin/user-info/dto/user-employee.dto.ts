import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * User's details as an employee
 *
 * @export
 * @class UserEmployeeDTO
 */
export class UserEmployeeDTO {
    @ApiModelProperty()
    @IsNotEmpty()
    designationId: string;

    @ApiModelProperty()
    @IsNotEmpty()
    companyId: string;

    @ApiModelProperty()
    @IsNotEmpty()
    departmentId: string;

    @ApiModelProperty()
    @IsNotEmpty()
    joinDate: Date;

    @ApiModelProperty()
    @IsNotEmpty()
    confirmationDate: Date;

    @ApiModelProperty()
    resignationDate: Date;

    @ApiModelProperty()
    @IsNotEmpty()
    emailId: string;

    @ApiModelProperty()
    @IsNotEmpty()
    branchId: string;

    @ApiModelProperty()
    @IsNotEmpty()
    roleId: string;

    @ApiModelProperty()
    @IsNotEmpty()
    reportingToId: string;

    @ApiModelProperty()
    @IsNotEmpty()
    calendarId: string;

    @ApiModelProperty()
    @IsNotEmpty()
    employmentStatus: number;

    @ApiModelProperty()
    @IsNotEmpty()
    costCentreId: string;
}
