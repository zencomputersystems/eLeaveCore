
import { IsNotEmpty } from 'class-validator';
import { CostCentreDto } from './costcentre.dto';
import { ApiModelProperty } from '@nestjs/swagger';
export class UpdateCostCentreDto extends CostCentreDto {

    @ApiModelProperty()
    @IsNotEmpty()
    readonly id: string; 
} 