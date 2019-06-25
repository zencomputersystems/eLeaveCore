
import { IsNotEmpty } from 'class-validator';
import { BranchDto } from './branch.dto';
import { ApiModelProperty } from '@nestjs/swagger';
/**
 * Data to update branch
 *
 * @export
 * @class UpdateBranchDto
 * @extends {BranchDto}
 */
export class UpdateBranchDto extends BranchDto {

    /**
     * Data branch id
     *
     * @type {string}
     * @memberof UpdateBranchDto
     */
    @ApiModelProperty()
    @IsNotEmpty()
    readonly id: string;


} 