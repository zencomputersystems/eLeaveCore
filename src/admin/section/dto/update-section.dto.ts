
import { IsNotEmpty } from 'class-validator';
import { SectionDto } from './section.dto';
export class UpdateSectionDto extends SectionDto {
    @IsNotEmpty()
    readonly id: string;

} 