import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * Data approved leave
 *
 * @export
 * @class ApprovedLeaveDTO
 */
export class ApprovedLeaveDTO {
    /**
     * Data approved leave - id
     *
     * @type {string}
     * @memberof ApprovedLeaveDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    id: string;
}