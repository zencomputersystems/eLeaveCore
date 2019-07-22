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
    @ApiModelProperty()
    @IsNotEmpty()
    id: string;

    /**
     * data company site to update
     *
     * @type {CreateCompanySiteDTO}
     * @memberof UpdateCompanySiteDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    data: CreateCompanySiteDTO;
}