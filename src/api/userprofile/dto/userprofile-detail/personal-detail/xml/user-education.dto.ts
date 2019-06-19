import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * User's education details
 *
 * @export
 * @class UserEducationDTO
 */
export class UserEducationDTO {
    @ApiModelProperty()
    @IsNotEmpty()
    qualificationLevel: string;

    @ApiModelProperty()
    @IsNotEmpty()
    major: string;

    @ApiModelProperty()
    @IsNotEmpty()
    university: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsNumber()
    year: number;
}