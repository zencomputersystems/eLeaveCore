import { ApiModelProperty } from '@nestjs/swagger';
import { ExcludeDayTypeXmlDTO } from './exclude-day-type.xml.dto';
import { IsNotEmpty, ValidateNested, IsNumber, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { GeneralPropertiesXmlDTO } from './general-properties.xml.dto';


/**
 *
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

    @ApiModelProperty({ description: 'Number of day for employee to apply leave in advance.' })
    @IsNotEmpty()
    @IsNumber()
    numberOfDays: number;

    @ApiModelProperty({ type: ExcludeDayTypeXmlDTO, description: 'Excluded Day Type from leave calculation' })
    @ValidateNested({ each: true })
    @Type(() => ExcludeDayTypeXmlDTO)
    excludeDayType: ExcludeDayTypeXmlDTO;

    @ApiModelProperty({
        type: GeneralPropertiesXmlDTO,
        description: 'Allow applicant to apply leave less than number of day (s) stated above'
    })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => GeneralPropertiesXmlDTO)
    isAllowShortNotice: GeneralPropertiesXmlDTO;

    @ApiModelProperty({ description: 'Mark short notice application as Emergency' })
    @IsNotEmpty()
    @IsBoolean()
    markAsEmergency: boolean;

}