
import { IsNotEmpty } from 'class-validator';
export class UpdateLeaveTypeDto {
    @IsNotEmpty()
    readonly id: string; 
    
    @IsNotEmpty()
    readonly code: string;

    @IsNotEmpty()
    readonly description: string;
} 