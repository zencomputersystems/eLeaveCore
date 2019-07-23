import { CreateGeneralLeavePolicyDTO } from './create-general-leave-policy.dto';
import { IsString, IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
/**
 * Update general leave policy dto
 *
 * @export
 * @class UpdateGeneralLeavePolicyDTO
 */
export class UpdateGeneralLeavePolicyDTO {
    /**
     * tenant company guid
     *
     * @type {string}
     * @memberof UpdateGeneralLeavePolicyDTO
     */
    @ApiModelProperty({ description: 'general leave policy guid', example: 'a0a77df0-ad24-11e9-95c9-07cfedcb23c0' })
    @IsNotEmpty()
    @IsString()
    generalPolicyId: string;
    /**
     * data policy
     *
     * @type {CreateGeneralLeavePolicyDTO}
     * @memberof UpdateGeneralLeavePolicyDTO
     */
    @ApiModelProperty({ description: 'policy data', type: CreateGeneralLeavePolicyDTO })
    @IsNotEmpty()
    @Type(() => CreateGeneralLeavePolicyDTO)
    data: CreateGeneralLeavePolicyDTO;
}