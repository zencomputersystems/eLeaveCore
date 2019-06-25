import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * User's education details
 *
 * @export
 * @class UserEducationDTO
 */
export class UserEducationDTO {
    /**
     * Data user education - qualification level
     *
     * @type {string}
     * @memberof UserEducationDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    qualificationLevel: string;

    /**
     * Data user education - major
     *
     * @type {string}
     * @memberof UserEducationDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    major: string;

    /**
     * Data user education - university
     *
     * @type {string}
     * @memberof UserEducationDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    university: string;

    /**
     * Data user education - year
     *
     * @type {number}
     * @memberof UserEducationDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    @IsNumber()
    year: number;
}