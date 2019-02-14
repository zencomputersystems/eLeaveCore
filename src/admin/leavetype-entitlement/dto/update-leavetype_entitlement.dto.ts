
import { IsNotEmpty } from 'class-validator';
import { LeaveTypeEntitlementDto } from './leavetype-entitlement.dto';
export class UpdateLeaveTypeEntitlementDto extends LeaveTypeEntitlementDto {
    @IsNotEmpty()
    readonly id: string; 
} 