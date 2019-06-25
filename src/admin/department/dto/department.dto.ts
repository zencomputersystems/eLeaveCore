import { ApiModelProperty } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

/**
 * Data for department
 *
 * @export
 * @class DepartmentDTO
 */
export class DepartmentDTO {
    /**
     * Data department name
     *
     * @type {string}
     * @memberof DepartmentDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    readonly name: string;
}