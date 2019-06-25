
import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
/**
 * Data for branch
 *
 * @export
 * @class BranchDto
 */
export class BranchDto {

    /**
     * Data branch name 
     *
     * @type {string}
     * @memberof BranchDto
     */
    @ApiModelProperty()
    @IsNotEmpty()
    readonly name: string;

} 