import { IsNotEmpty, IsBoolean, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { LeaveTypeServiceYearDto } from './leavetype-serviceyear.dto';
export class LeaveTypePropertiesDto {
    
    @IsNotEmpty()
    @IsBoolean()
    readonly apply_in_advance: boolean;

    @IsNotEmpty()
    @IsBoolean()
    readonly apply_next_year: boolean;

    @IsNotEmpty()
    @IsBoolean()
    readonly claim_entitlement: boolean;
    
    @IsNotEmpty()
    @IsBoolean()
    readonly apply_halfday: boolean;
    
    @IsNotEmpty()
    @IsBoolean()
    readonly attachment_required: boolean;
    
    // @IsNotEmpty()
    // readonly apply_before: any;
    
    // @IsNotEmpty()
    // readonly apply_more_than_balance: any;
    
    // @IsNotEmpty()
    // readonly allow_cancel_after_startdate: any;

    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => LeaveTypeServiceYearDto)
    readonly levels: LeaveTypeServiceYearDto[]


} 