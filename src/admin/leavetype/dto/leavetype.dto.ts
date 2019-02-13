import { IsNotEmpty } from 'class-validator';
export class LeaveTypeDto {
    
    @IsNotEmpty()
    readonly code: string;

    @IsNotEmpty()
    readonly description: string;
} 