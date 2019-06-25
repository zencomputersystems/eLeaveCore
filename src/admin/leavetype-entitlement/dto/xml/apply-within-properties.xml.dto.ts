import { ExcludeDayTypeXmlDTO } from './exclude-day-type.xml.dto';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, ValidateNested, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { GeneralPropertiesXmlDTO } from './general-properties.xml.dto';

/**
 * Data XML for Apply Within Properties
 *
 * @export
 * @class ApplyWithinPropertiesXmlDTO
 */
export class ApplyWithinPropertiesXmlDTO {

    constructor() {
        this.numberOfDays = 0;
        this.isAllowBackdated = new GeneralPropertiesXmlDTO();
        this.excludeDayType = new ExcludeDayTypeXmlDTO();
    }

    /**
     * Number of day required for backdated leave submission
     *
     * @type {number}
     * @memberof ApplyWithinPropertiesXmlDTO
     */
    @ApiModelProperty({ description: 'Number of day required for backdated leave submission.' })
    @IsNotEmpty()
    @IsNumber()
    numberOfDays: number;

    /**
     * Excluded Day Type from leave calculation
     *
     * @type {ExcludeDayTypeXmlDTO}
     * @memberof ApplyWithinPropertiesXmlDTO
     */
    @ApiModelProperty({ type: ExcludeDayTypeXmlDTO, description: 'Excluded Day Type from leave calculation' })
    @ValidateNested({ each: true })
    @Type(() => ExcludeDayTypeXmlDTO)
    excludeDayType: ExcludeDayTypeXmlDTO;

    /**
     * Allow employee apply leave although didn’t follow rule in Apply Within
     *
     * @type {GeneralPropertiesXmlDTO}
     * @memberof ApplyWithinPropertiesXmlDTO
     */
    @ApiModelProperty({ type: GeneralPropertiesXmlDTO, description: 'Allow employee apply leave although didn’t follow rule in Apply Within' })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => GeneralPropertiesXmlDTO)
    isAllowBackdated: GeneralPropertiesXmlDTO;
}