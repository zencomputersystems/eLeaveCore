
import { IsNotEmpty } from 'class-validator';
import { LeaveTypeDto } from './leavetype.dto';
export class UpdateLeaveTypeDto extends LeaveTypeDto {
    @IsNotEmpty()
    readonly id: string; 
} 