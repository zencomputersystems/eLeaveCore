
import { LeaveTypeEntitlementDto } from './xml/leavetype-entitlement.dto';
import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
export class CreateLeaveEntitlementTypeDto extends LeaveTypeEntitlementDto {
    @ApiModelProperty()
    @IsNotEmpty()
    readonly leavetype_id: string;
} 