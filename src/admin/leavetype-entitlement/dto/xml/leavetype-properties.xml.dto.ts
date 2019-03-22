import { IsNotEmpty, IsBoolean, ValidateNested, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { LeaveTypeLevelsXmlDTO } from './leavetype-levels.xml.dto';
import { ExcludeDayTypeXmlDTO } from './exclude-day-type.xml.dto';
import { ApplyBeforePropertiesXmlDTO } from './apply-before-properties.xml.dto';
import { ApplyWithinPropertiesXmlDTO } from './apply-within-properties.xml.dto';
import { GeneralPropertiesXmlDTO } from './general-properties.xml.dto';

export class LeaveTypePropertiesXmlDTO {

    constructor() {
        this.applyInAdvance = false;
        this.applyNextYear = false;
        this.claimEntitlement = false;
        this.applyHalfday = false;
        this.attachmentRequired = false;
        this.excludeDayType = new ExcludeDayTypeXmlDTO();
        this.applyBeforeProperties = new ApplyBeforePropertiesXmlDTO();
        this.applyWithinProperties = new ApplyWithinPropertiesXmlDTO();
        this.isAllowAppliedMoreThanBalance = new GeneralPropertiesXmlDTO();
        this.isAllowAfterEmploymentStatus = new GeneralPropertiesXmlDTO();
        this.isAllowLeaveCancelAfterDate = new GeneralPropertiesXmlDTO();
        this.isLimitApplicationToCarryForward = new GeneralPropertiesXmlDTO();
    }
    
    @ApiModelProperty({description:'Allow Applicant to Apply Leave in Advance'})
    @IsNotEmpty()
    @IsBoolean()
    applyInAdvance: boolean;

    @ApiModelProperty({description:'Allow Applicant to Apply Leave of the Following Year'})
    @IsNotEmpty()
    @IsBoolean()
    applyNextYear: boolean;

    @ApiModelProperty({description:'Allow Applicant to claim entitlement (E.g. work OT,AL/RL'})
    @IsNotEmpty()
    @IsBoolean()
    claimEntitlement: boolean;
    
    @ApiModelProperty({description:'Allow Applicant to Apply Half Day (0.5) Leave'})
    @IsNotEmpty()
    @IsBoolean()
    applyHalfday: boolean;
    
    @ApiModelProperty({description:'Attach Certificate/ Supporting Documents (e.g.: Medical Certificate)'})
    @IsNotEmpty()
    @IsBoolean()
    attachmentRequired: boolean;
    
    @ApiModelProperty({type:ExcludeDayTypeXmlDTO,description:'Excluded Day Type from leave calculation'})
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => ExcludeDayTypeXmlDTO)
    excludeDayType: ExcludeDayTypeXmlDTO;

    @ApiModelProperty({type:ApplyBeforePropertiesXmlDTO,description:'Apply Before Properties'})
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => ApplyBeforePropertiesXmlDTO)
    applyBeforeProperties: ApplyBeforePropertiesXmlDTO;

    @ApiModelProperty({type:ApplyWithinPropertiesXmlDTO,description:'Apply Within Properties'})
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => ApplyWithinPropertiesXmlDTO)
    applyWithinProperties: ApplyWithinPropertiesXmlDTO;
    
    @ApiModelProperty({
        type: GeneralPropertiesXmlDTO,
        description:'Allow employee to apply more than leave balance'
    })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => GeneralPropertiesXmlDTO)
    isAllowAppliedMoreThanBalance: GeneralPropertiesXmlDTO;

    @ApiModelProperty({description:'Convert exceed leave amount to other leave type'})
    convertExceedLeaveAmount: string;

    @ApiModelProperty({description:'Number of days that can be apply in each leave type'})
    @IsNumber()
    @IsNotEmpty()
    maxDayPerLeave: number;

    @ApiModelProperty({
        type: GeneralPropertiesXmlDTO,
        description:'Allow to Apply Leave After reach this employment status'
    })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => GeneralPropertiesXmlDTO)
    isAllowAfterEmploymentStatus: GeneralPropertiesXmlDTO;

    @ApiModelProperty({
        type: GeneralPropertiesXmlDTO,
        description: 'Allow Applicant to cancel leave after start/expired date'
    })
    @ValidateNested({ each: true })
    @Type(() => GeneralPropertiesXmlDTO)
    isAllowLeaveCancelAfterDate: GeneralPropertiesXmlDTO;

    @ApiModelProperty({
        type: GeneralPropertiesXmlDTO,
        description: 'Allow employee apply leave using current year bring forward amount only'
    })
    @ValidateNested({ each: true })
    @Type(() => GeneralPropertiesXmlDTO)
    isLimitApplicationToCarryForward: GeneralPropertiesXmlDTO;

    @ApiModelProperty({description:'Leave Entitlment type'})
    @IsString()
    @IsNotEmpty()
    leaveEntitlementType: string;

    @ApiModelProperty({description:'Leave entitlement rounding'})
    @IsString()
    @IsNotEmpty()
    leaveEntitlementRounding: string;

    @ApiModelProperty({
        type:LeaveTypeLevelsXmlDTO,
        description: 'Leave entitlement based on service year'
    })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => LeaveTypeLevelsXmlDTO)
    levels: LeaveTypeLevelsXmlDTO


} 