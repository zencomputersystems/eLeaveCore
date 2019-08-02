
import { IsNotEmpty } from 'class-validator';
import { CostCentreDto } from './costcentre.dto';
import { ApiModelProperty } from '@nestjs/swagger';
/**
 * Data to update cost centre
 *
 * @export
 * @class UpdateCostCentreDto
 * @extends {CostCentreDto}
 */
export class UpdateCostCentreDto extends CostCentreDto {

    /**
     * Data cost centre id
     *
     * @type {string}
     * @memberof UpdateCostCentreDto
     */
    @ApiModelProperty({ description: 'Cost centre id', example: 'hgiosbgby83g939bhvg3849bgvurebv' })
    @IsNotEmpty()
    readonly id: string;
} 