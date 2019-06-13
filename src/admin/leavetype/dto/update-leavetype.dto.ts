
import { IsNotEmpty } from 'class-validator';
import { LeaveTypeDto } from './leavetype.dto';
import { ApiModelProperty } from '@nestjs/swagger';
/**
 * dto to update leavetype extend leavetype base class
 *
 * @export
 * @class UpdateLeaveTypeDto
 * @extends {LeaveTypeDto}
 */
export class UpdateLeaveTypeDto extends LeaveTypeDto {

    @ApiModelProperty({description:'Leavetype GUID',example:'85747738-66bf-8cb1-768a-d73319c61759'})
    @IsNotEmpty()
    readonly id: string; 
} 