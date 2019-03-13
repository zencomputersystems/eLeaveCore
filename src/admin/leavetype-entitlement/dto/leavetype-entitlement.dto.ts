import { IsNotEmpty, ValidateNested } from 'class-validator';
import { LeaveTypePropertiesDto } from './xml/leavetype-properties.dto';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

export class LeaveTypeEntitlementDto {

    @ApiModelProperty()
    @IsNotEmpty()
    readonly code: string;

    @ApiModelProperty()
    @IsNotEmpty()
    readonly description: string;

    @ApiModelProperty({type:LeaveTypePropertiesDto})
    @Type(() => LeaveTypePropertiesDto)
    @IsNotEmpty()
    @ValidateNested()
    readonly properties: LeaveTypePropertiesDto;
} 