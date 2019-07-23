import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * DTO for User Spouse
 *
 * @export
 * @class UserSpouseDTO
 */
export class UserSpouseDTO {
    @ApiModelProperty()
    @IsNotEmpty()
    spouseName: string;

    @ApiModelProperty()
    @IsNotEmpty()
    spouseIdentificationNumber: string;
}