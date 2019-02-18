import { IsNotEmpty, IsBoolean, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { LeaveTypeServiceYearDto } from './leavetype-serviceyear.dto';
import { ApiModelProperty } from '@nestjs/swagger';
export class LeaveTypePropertiesDto {
    
    @ApiModelProperty()
    @IsNotEmpty()
    @IsBoolean()
    readonly apply_in_advance: boolean;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsBoolean()
    readonly apply_next_year: boolean;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsBoolean()
    readonly claim_entitlement: boolean;
    
    @ApiModelProperty()
    @IsNotEmpty()
    @IsBoolean()
    readonly apply_halfday: boolean;
    
    @ApiModelProperty()
    @IsNotEmpty()
    @IsBoolean()
    readonly attachment_required: boolean;
    
    // @IsNotEmpty()
    // readonly apply_before: any;
    
    // @IsNotEmpty()
    // readonly apply_more_than_balance: any;
    
    // @IsNotEmpty()
    // readonly allow_cancel_after_startdate: any;

    @ApiModelProperty({type:LeaveTypeServiceYearDto})
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => LeaveTypeServiceYearDto)
    readonly levels: LeaveTypeServiceYearDto[]


} 