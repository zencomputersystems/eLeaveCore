
import { IsNotEmpty } from 'class-validator';
export class UpdateCostCentreDto {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly id: string; 
} 