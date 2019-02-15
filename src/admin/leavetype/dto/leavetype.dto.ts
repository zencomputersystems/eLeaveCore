import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
export class LeaveTypeDto {
    
    @ApiModelProperty()
    @IsNotEmpty()
    readonly code: string;

    @ApiModelProperty()
    @IsNotEmpty()
    readonly description: string;
} 