import { IsNotEmpty, IsBoolean, ValidateNested, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { LeaveTypeLevelsXmlDTO } from './leavetype-levels.xml.dto';
import { ExcludeDayTypeXmlDTO } from './exclude-day-type.xml.dto';
import { ApplyBeforePropertiesXmlDTO } from './apply-before-properties.xml.dto';
import { ApplyWithinPropertiesXmlDTO } from './apply-within-properties.xml.dto';
import { GeneralPropertiesXmlDTO } from './general-properties.xml.dto';

/**
 * Data XML leavetype properties
 *
 * @export
 * @class LeaveTypePropertiesXmlDTO
 */
export class LeaveTypePropertiesXmlDTO {

    constructor() {
        this.applyInAdvance = false;
        this.applyNextYear = false;
        this.claimEntitlement = false;
        this.applyFractionUnit = "";
        this.includeOtherLeaveType = "";
        this.attachmentRequired = false;
        this.excludeDayType = new ExcludeDayTypeXmlDTO();
        this.applyBeforeProperties = new ApplyBeforePropertiesXmlDTO();
        this.applyWithinProperties = new ApplyWithinPropertiesXmlDTO();
        this.isAllowAppliedMoreThanBalance = new GeneralPropertiesXmlDTO();
        this.isAllowAfterJoinDate = true;
        this.isAllowLeaveCancelAfterDate = new GeneralPropertiesXmlDTO();
        this.isLimitApplicationToCarryForward = new GeneralPropertiesXmlDTO();
    }

    /**
     * Allow Applicant to Apply Leave in Advance
     *
     * @type {boolean}
     * @memberof LeaveTypePropertiesXmlDTO
     */
    @ApiModelProperty({ description: 'Allow Applicant to Apply Leave in Advance' })
    @IsNotEmpty()
    @IsBoolean()
    applyInAdvance: boolean;

    /**
     * Allow Applicant to Apply Leave of the Following Year
     *
     * @type {boolean}
     * @memberof LeaveTypePropertiesXmlDTO
     */
    @ApiModelProperty({ description: 'Allow Applicant to Apply Leave of the Following Year' })
    @IsNotEmpty()
    @IsBoolean()
    applyNextYear: boolean;

    /**
     * Allow Applicant to claim entitlement (E.g. work OT,AL/RL)
     *
     * @type {boolean}
     * @memberof LeaveTypePropertiesXmlDTO
     */
    @ApiModelProperty({ description: 'Allow Applicant to claim entitlement (E.g. work OT,AL/RL' })
    @IsNotEmpty()
    @IsBoolean()
    claimEntitlement: boolean;

    /**
     * Allow Applicant to Apply Fraction of Unit (0.5 or 0.25)
     *
     * @type {string}
     * @memberof LeaveTypePropertiesXmlDTO
     */
    @ApiModelProperty({ description: 'Allow Applicant to Apply Fraction of Unit (0.5 or 0.25)' })
    @IsString()
    applyFractionUnit: string;

    /**
     * Include other leave type in balance calculation
     *
     * @type {string}
     * @memberof LeaveTypePropertiesXmlDTO
     */
    @ApiModelProperty({ description: 'Include other leave type in balance calculation' })
    @IsString()
    includeOtherLeaveType: string;

    /**
     * Attach Certificate/ Supporting Documents (e.g.: Medical Certificate)
     *
     * @type {boolean}
     * @memberof LeaveTypePropertiesXmlDTO
     */
    @ApiModelProperty({ description: 'Attach Certificate/ Supporting Documents (e.g.: Medical Certificate)' })
    @IsNotEmpty()
    @IsBoolean()
    attachmentRequired: boolean;

    /**
     * Excluded Day Type from leave calculation
     *
     * @type {ExcludeDayTypeXmlDTO}
     * @memberof LeaveTypePropertiesXmlDTO
     */
    @ApiModelProperty({ type: ExcludeDayTypeXmlDTO, description: 'Excluded Day Type from leave calculation' })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => ExcludeDayTypeXmlDTO)
    excludeDayType: ExcludeDayTypeXmlDTO;

    /**
     * Apply Before Properties
     *
     * @type {ApplyBeforePropertiesXmlDTO}
     * @memberof LeaveTypePropertiesXmlDTO
     */
    @ApiModelProperty({ type: ApplyBeforePropertiesXmlDTO, description: 'Apply Before Properties' })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => ApplyBeforePropertiesXmlDTO)
    applyBeforeProperties: ApplyBeforePropertiesXmlDTO;

    /**
     * Apply Within Properties
     *
     * @type {ApplyWithinPropertiesXmlDTO}
     * @memberof LeaveTypePropertiesXmlDTO
     */
    @ApiModelProperty({ type: ApplyWithinPropertiesXmlDTO, description: 'Apply Within Properties' })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => ApplyWithinPropertiesXmlDTO)
    applyWithinProperties: ApplyWithinPropertiesXmlDTO;

    /**
     * Allow employee to apply more than leave balance
     *
     * @type {GeneralPropertiesXmlDTO}
     * @memberof LeaveTypePropertiesXmlDTO
     */
    @ApiModelProperty({
        type: GeneralPropertiesXmlDTO,
        description: 'Allow employee to apply more than leave balance'
    })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => GeneralPropertiesXmlDTO)
    isAllowAppliedMoreThanBalance: GeneralPropertiesXmlDTO;

    /**
     * Convert exceed leave amount to other leave type
     *
     * @type {string}
     * @memberof LeaveTypePropertiesXmlDTO
     */
    @ApiModelProperty({ description: 'Convert exceed leave amount to other leave type' })
    convertExceedLeaveAmount: string;

    /**
     * Number of days that can be apply in each leave type
     *
     * @type {number}
     * @memberof LeaveTypePropertiesXmlDTO
     */
    @ApiModelProperty({ description: 'Number of days that can be apply in each leave type' })
    @IsNumber()
    @IsNotEmpty()
    maxDayPerLeave: number;

    /**
     * Allow to Apply Leave After Join
     *
     * @type {boolean}
     * @memberof LeaveTypePropertiesXmlDTO
     */
    @ApiModelProperty({
        type: GeneralPropertiesXmlDTO,
        description: 'Allow to Apply Leave After Join'
    })
    @IsNotEmpty()
    @IsBoolean()
    isAllowAfterJoinDate: boolean;

    /**
     * Allow Applicant to cancel leave after start/expired date
     *
     * @type {GeneralPropertiesXmlDTO}
     * @memberof LeaveTypePropertiesXmlDTO
     */
    @ApiModelProperty({
        type: GeneralPropertiesXmlDTO,
        description: 'Allow Applicant to cancel leave after start/expired date'
    })
    @ValidateNested({ each: true })
    @Type(() => GeneralPropertiesXmlDTO)
    isAllowLeaveCancelAfterDate: GeneralPropertiesXmlDTO;

    /**
     * Allow employee apply leave using current year bring forward amount only
     *
     * @type {GeneralPropertiesXmlDTO}
     * @memberof LeaveTypePropertiesXmlDTO
     */
    @ApiModelProperty({
        type: GeneralPropertiesXmlDTO,
        description: 'Allow employee apply leave using current year bring forward amount only'
    })
    @ValidateNested({ each: true })
    @Type(() => GeneralPropertiesXmlDTO)
    isLimitApplicationToCarryForward: GeneralPropertiesXmlDTO;

    /**
     * Leave Entitlment type
     *
     * @type {string}
     * @memberof LeaveTypePropertiesXmlDTO
     */
    @ApiModelProperty({ description: 'Leave Entitlment type' })
    @IsString()
    @IsNotEmpty()
    leaveEntitlementType: string;

    /**
     * Leave entitlement rounding
     *
     * @type {string}
     * @memberof LeaveTypePropertiesXmlDTO
     */
    @ApiModelProperty({ description: 'Leave entitlement rounding' })
    @IsString()
    @IsNotEmpty()
    leaveEntitlementRounding: string;

    /**
     * Leave entitlement based on service year
     *
     * @type {LeaveTypeLevelsXmlDTO}
     * @memberof LeaveTypePropertiesXmlDTO
     */
    @ApiModelProperty({
        type: LeaveTypeLevelsXmlDTO,
        description: 'Leave entitlement based on service year'
    })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => LeaveTypeLevelsXmlDTO)
    levels: LeaveTypeLevelsXmlDTO


} 