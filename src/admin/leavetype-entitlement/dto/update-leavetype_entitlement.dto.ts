
import { IsNotEmpty } from 'class-validator';
import { LeaveTypeEntitlementDto } from './leavetype-entitlement.dto';
import { ApiModelProperty } from '@nestjs/swagger';
export class UpdateLeaveTypeEntitlementDto extends LeaveTypeEntitlementDto {
    
    @ApiModelProperty()
    @IsNotEmpty()
    readonly id: string; 
} 