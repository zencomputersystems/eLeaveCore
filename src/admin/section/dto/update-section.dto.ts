
import { IsNotEmpty } from 'class-validator';
import { SectionDto } from './section.dto';
import { ApiModelProperty } from '@nestjs/swagger';
/**
 * dto to update section extend section base class
 *
 * @export
 * @class UpdateSectionDto
 * @extends {SectionDto}
 */
export class UpdateSectionDto extends SectionDto {
    /**
     * Data update section - id
     *
     * @type {string}
     * @memberof UpdateSectionDto
     */
    @ApiModelProperty({ description: 'Section id', example: 'c5fb24c0-9245-11e9-aa1c-cbda7717b5a8' })
    @IsNotEmpty()
    readonly id: string;

} 