
import { IsNotEmpty } from 'class-validator';
export class CostCentreDto {
    @IsNotEmpty()
    readonly name: string;
} 