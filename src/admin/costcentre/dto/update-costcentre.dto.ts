
import { IsNotEmpty } from 'class-validator';
import { CostCentreDto } from './costcentre.dto';
export class UpdateCostCentreDto extends CostCentreDto {
    @IsNotEmpty()
    readonly id: string; 
} 