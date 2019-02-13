
import { IsNotEmpty } from 'class-validator';
export class SectionDto {
    @IsNotEmpty()
    readonly name: string;

} 