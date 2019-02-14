import { IsNotEmpty, ValidateNested } from 'class-validator';
import { LeaveTypePropertiesDto } from './leavetype-properties.dto';
import { Type } from 'class-transformer';

export class LeaveTypeEntitlementDto {

    @IsNotEmpty()
    readonly code: string;

    @IsNotEmpty()
    readonly description: string;

    @Type(() => LeaveTypePropertiesDto)
    @IsNotEmpty()
    @ValidateNested()
    readonly properties: LeaveTypePropertiesDto;
} 