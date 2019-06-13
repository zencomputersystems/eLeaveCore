
import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
/**
 * base class for section dto
 *
 * @export
 * @class SectionDto
 */
export class SectionDto {
    @ApiModelProperty()
    @IsNotEmpty()
    readonly name: string;

} 