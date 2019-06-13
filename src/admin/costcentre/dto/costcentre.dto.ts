
import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
/**
 *
 *
 * @export
 * @class CostCentreDto
 */
export class CostCentreDto {

    @ApiModelProperty()
    @IsNotEmpty()
    readonly name: string;
} 