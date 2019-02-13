
import { IsNotEmpty } from 'class-validator';
import { LeaveTypeEntitlementDto } from './leavetype-entitlement.dto';
export class UpdateLeaveTypeDto extends LeaveTypeEntitlementDto {
    @IsNotEmpty()
    readonly id: string; 
} 