import { ApiModelProperty } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';
import { DepartmentDTO } from './department.dto';

/**
 * Data to update department
 *
 * @export
 * @class UpdateDepartmentDTO
 * @extends {DepartmentDTO}
 */
export class UpdateDepartmentDTO extends DepartmentDTO {
    /**
     * Data department id
     *
     * @type {string}
     * @memberof UpdateDepartmentDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    readonly id: string;
}