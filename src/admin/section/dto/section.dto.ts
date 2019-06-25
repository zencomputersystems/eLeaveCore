
import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
/**
 * base class for section dto
 *
 * @export
 * @class SectionDto
 */
export class SectionDto {
    /**
     * Data for section - name
     *
     * @type {string}
     * @memberof SectionDto
     */
    @ApiModelProperty()
    @IsNotEmpty()
    readonly name: string;

} 