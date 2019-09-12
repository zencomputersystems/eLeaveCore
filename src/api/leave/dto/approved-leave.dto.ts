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
    @ApiModelProperty({ description: 'Leave transaction guid', example: '0624d2b0-bda9-11e9-8428-0521341e5440' })
    @IsNotEmpty()
    id: string;
}