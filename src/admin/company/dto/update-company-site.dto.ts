import { CreateCompanySiteDTO } from './create-company-site.dto';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
/**
 * Update company site DTO
 *
 * @export
 * @class UpdateCompanySiteDTO
 */
export class UpdateCompanySiteDTO {
    /**
     * id company site
     *
     * @type {string}
     * @memberof UpdateCompanySiteDTO
     */
    @ApiModelProperty({ description: 'company site id', example: '52a18f20-ac33-11e9-a1e5-2bc9cb9edc32' })
    @IsNotEmpty()
    id: string;

    /**
     * data company site to update
     *
     * @type {CreateCompanySiteDTO}
     * @memberof UpdateCompanySiteDTO
     */
    @ApiModelProperty({ description: 'Company site data' })
    @IsNotEmpty()
    data: CreateCompanySiteDTO;
}