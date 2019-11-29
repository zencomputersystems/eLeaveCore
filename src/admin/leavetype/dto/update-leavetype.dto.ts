
import { IsNotEmpty } from 'class-validator';
import { LeaveTypeDTO } from './leavetype.dto';
import { ApiModelProperty } from '@nestjs/swagger';
/**
 * dto to update leavetype extend leavetype base class
 *
 * @export
 * @class UpdateLeaveTypeDto
 * @extends {LeaveTypeDto}
 */
export class UpdateLeaveTypeDTO extends LeaveTypeDTO {

    /**
     * Data update leavetype - id 
     *
     * @type {string}
     * @memberof UpdateLeaveTypeDto
     */
    @ApiModelProperty({ description: 'Leavetype GUID', example: '8fae9580-f089-11e9-8b1d-3592f6ef2e3d' })
    @IsNotEmpty()
    readonly id: string;
} 