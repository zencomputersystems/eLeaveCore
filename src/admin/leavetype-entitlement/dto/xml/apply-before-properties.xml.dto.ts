import { ApiModelProperty } from '@nestjs/swagger';
import { ExcludeDayTypeXmlDTO } from './exclude-day-type.xml.dto';
import { IsNotEmpty, ValidateNested, IsNumber, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { GeneralPropertiesXmlDTO } from './general-properties.xml.dto';


/**
 * Data XML for Apply Before Properties
 *
 * @export
 * @class ApplyBeforePropertiesXmlDTO
 */
export class ApplyBeforePropertiesXmlDTO {

    constructor() {
        this.numberOfDays = 0;
        this.isAllowShortNotice = new GeneralPropertiesXmlDTO();
        this.excludeDayType = new ExcludeDayTypeXmlDTO();
        this.markAsEmergency = false;
    }

    /**
     * Number of day for employee to apply leave in advance.
     *
     * @type {number}
     * @memberof ApplyBeforePropertiesXmlDTO
     */
    @ApiModelProperty({ description: 'Number of day for employee to apply leave in advance.' })
    @IsNotEmpty()
    @IsNumber()
    numberOfDays: number;

    /**
     * Excluded Day Type from leave calculation
     *
     * @type {ExcludeDayTypeXmlDTO}
     * @memberof ApplyBeforePropertiesXmlDTO
     */
    @ApiModelProperty({ type: ExcludeDayTypeXmlDTO, description: 'Excluded Day Type from leave calculation' })
    @ValidateNested({ each: true })
    @Type(() => ExcludeDayTypeXmlDTO)
    excludeDayType: ExcludeDayTypeXmlDTO;

    /**
     * Allow applicant to apply leave less than number of day (s) stated above
     *
     * @type {GeneralPropertiesXmlDTO}
     * @memberof ApplyBeforePropertiesXmlDTO
     */
    @ApiModelProperty({ type: GeneralPropertiesXmlDTO, description: 'Allow applicant to apply leave less than number of day (s) stated above' })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => GeneralPropertiesXmlDTO)
    isAllowShortNotice: GeneralPropertiesXmlDTO;

    /**
     * Mark short notice application as Emergency
     *
     * @type {boolean}
     * @memberof ApplyBeforePropertiesXmlDTO
     */
    @ApiModelProperty({ description: 'Mark short notice application as Emergency' })
    @IsNotEmpty()
    @IsBoolean()
    markAsEmergency: boolean;

}