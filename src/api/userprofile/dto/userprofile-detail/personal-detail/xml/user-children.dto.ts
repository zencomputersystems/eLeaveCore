import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * User children DTO
 *
 * @export
 * @class UserChildrenDTO
 */
export class UserChildrenDTO {
    /**
     * Data user children - childname
     *
     * @type {string}
     * @memberof UserChildrenDTO
     */
    @ApiModelProperty({ description: 'Child name', example: 'Err yee yuan' })
    @IsNotEmpty()
    childName: string;

    /**
     * Data user children - child identification number
     *
     * @type {string}
     * @memberof UserChildrenDTO
     */
    @ApiModelProperty({ description: 'Child identification number', example: '010912109814' })
    @IsNotEmpty()
    childIdentificationNumber: string;
}