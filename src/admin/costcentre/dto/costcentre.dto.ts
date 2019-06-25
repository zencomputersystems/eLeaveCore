
import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
/**
 * Data for cost centre
 *
 * @export
 * @class CostCentreDto
 */
export class CostCentreDto {

    /**
     * Data company name
     *
     * @type {string}
     * @memberof CostCentreDto
     */
    @ApiModelProperty()
    @IsNotEmpty()
    readonly name: string;
} 