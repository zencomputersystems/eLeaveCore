import { ApiModelProperty } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';
import { DepartmentDTO } from './department.dto';

/**
 *
 *
 * @export
 * @class UpdateDepartmentDTO
 * @extends {DepartmentDTO}
 */
export class UpdateDepartmentDTO extends DepartmentDTO {
    @ApiModelProperty()
    @IsNotEmpty()
    readonly id: string;
}