
import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
/**
 *
 *
 * @export
 * @class BranchDto
 */
export class BranchDto {

    @ApiModelProperty()
    @IsNotEmpty()
    readonly name: string;

} 