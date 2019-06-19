import { ApiModelProperty } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

/**
 *
 *
 * @export
 * @class DepartmentDTO
 */
export class DepartmentDTO {
    @ApiModelProperty()
    @IsNotEmpty()
    readonly name: string;
}