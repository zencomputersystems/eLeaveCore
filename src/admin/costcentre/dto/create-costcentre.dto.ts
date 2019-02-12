
import { IsNotEmpty } from 'class-validator';
export class CreateCostCentreDto {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly description: string; 
} 