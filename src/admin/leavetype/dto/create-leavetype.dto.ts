
import { IsNotEmpty } from 'class-validator';
export class CreateLeaveTypeDto {
    @IsNotEmpty()
    readonly code: string;

    @IsNotEmpty()
    readonly description: string;
} 