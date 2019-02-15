
import { IsNotEmpty } from 'class-validator';
import { LeaveTypeDto } from './leavetype.dto';
import { ApiModelProperty } from '@nestjs/swagger';
export class UpdateLeaveTypeDto extends LeaveTypeDto {

    @ApiModelProperty()
    @IsNotEmpty()
    readonly id: string; 
} 