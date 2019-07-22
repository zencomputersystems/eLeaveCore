import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

/**
 * Update company dto
 *
 * @export
 * @class UpdateCompanyDTO
 */
export class UpdateCompanyDTO {
    /**
     * company id
     *
     * @type {string}
     * @memberof UpdateCompanyDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    id: string;

    /**
     * company name
     *
     * @type {string}
     * @memberof UpdateCompanyDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    name: string;
}