import { IsNotEmpty } from 'class-validator';
export class LeaveTypeEntitlementDto {
    
    @IsNotEmpty()
    readonly code: string;

    @IsNotEmpty()
    readonly description: string;
} 