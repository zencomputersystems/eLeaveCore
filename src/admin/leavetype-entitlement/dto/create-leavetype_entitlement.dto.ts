
import { LeaveTypeEntitlementDto } from './leavetype-entitlement.dto';
import { IsNotEmpty } from 'class-validator';
export class CreateLeaveEntitlementTypeDto extends LeaveTypeEntitlementDto {
    @IsNotEmpty()
    readonly leavetype_id: string;
} 