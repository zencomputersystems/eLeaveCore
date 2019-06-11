import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * User children DTO
 *
 * @export
 * @class UserChildrenDTO
 */
export class UserChildrenDTO {
    @ApiModelProperty()
    @IsNotEmpty()
    childName: string;

    @ApiModelProperty()
    @IsNotEmpty()
    childIdentificationNumber: string;
}
