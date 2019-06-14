
import { IsNotEmpty } from 'class-validator';
import { BranchDto } from './branch.dto';
import { ApiModelProperty } from '@nestjs/swagger';
/**
 *
 *
 * @export
 * @class UpdateBranchDto
 * @extends {BranchDto}
 */
export class UpdateBranchDto extends BranchDto {

    @ApiModelProperty()
    @IsNotEmpty()
    readonly id: string;


} 