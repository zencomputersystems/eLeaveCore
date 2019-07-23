import { GeneralLeavePolicyXMLDTO } from './xml/general-leave-policy-xml.dto';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
/**
 * Create General Leave Policy DTO
 *
 * @export
 * @class CreateGeneralLeavePolicyDTO
 */
export class CreateGeneralLeavePolicyDTO extends GeneralLeavePolicyXMLDTO {
    /**
     * Tenant company guid
     *
     * @type {string}
     * @memberof CreateGeneralLeavePolicyDTO
     */
    @ApiModelProperty({ description: 'tenant company guid', example: '323bdfa7-eed2-8bf2-2274-b1cd9390c9ca' })
    @IsString()
    @IsNotEmpty()
    tenantCompanyId: string;
}