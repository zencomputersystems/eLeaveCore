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
    @ApiModelProperty({ description: 'Qualification level', example: 'Bachelor Degree' })
    @IsNotEmpty()
    qualificationLevel: string;

    /**
     * Data user education - major
     *
     * @type {string}
     * @memberof UserEducationDTO
     */
    @ApiModelProperty({ description: 'Major course', example: 'computer science' })
    @IsNotEmpty()
    major: string;

    /**
     * Data user education - university
     *
     * @type {string}
     * @memberof UserEducationDTO
     */
    @ApiModelProperty({ description: 'University of studies', example: 'Universiti Kebangsaan Malaysia' })
    @IsNotEmpty()
    university: string;

    /**
     * Data user education - string stated year form to year to 
     *
     * @type {string}
     * @memberof UserEducationDTO
     */
    @ApiModelProperty({ description: 'Year start and year end', example: '2011-2015' })
    @IsNotEmpty()
    year: string;
}