
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
    @ApiModelProperty()
    @IsNotEmpty()
    readonly id: string;

} 