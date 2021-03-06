import { IsBoolean, IsString, IsNotEmpty, ValidateIf } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * general propertiesxmldto
 *
 * @export
 * @class GeneralPropertiesXmlDTO
 */
export class GeneralPropertiesXmlDTO {
    /**
     * Creates an instance of GeneralPropertiesXmlDTO.
     * @memberof GeneralPropertiesXmlDTO
     */
    constructor() {
        this.isCheck = false;
    }

    /**
     * Data for general properties - isCheck
     *
     * @type {boolean}
     * @memberof GeneralPropertiesXmlDTO
     */
    @ApiModelProperty({ description: 'Is check', example: false })
    @IsNotEmpty()
    @IsBoolean()
    isCheck: boolean;

    /**
     * Data for general properties - text value
     *
     * @type {string}
     * @memberof GeneralPropertiesXmlDTO
     */
    @ApiModelProperty({ description: 'Text value', example: 'Some value' })
    @ValidateIf(o => o.isCheck == true)
    @IsNotEmpty()
    @IsString()
    textValue: string;
}