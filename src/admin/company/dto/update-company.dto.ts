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
    @ApiModelProperty({ description: 'Company id', example: '323bdfa7-eed2-8bf2-2274-b1cd9390c9ca' })
    @IsNotEmpty()
    id: string;

    /**
     * company name
     *
     * @type {string}
     * @memberof UpdateCompanyDTO
     */
    @ApiModelProperty({ description: 'Company name', example: 'Zen Computer Systems Sdn Bhd' })
    @IsNotEmpty()
    name: string;
}