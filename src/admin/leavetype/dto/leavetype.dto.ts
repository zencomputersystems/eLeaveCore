import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
/**
 * Base class leavetype dto
 *
 * @export
 * @class LeaveTypeDto
 */
export class LeaveTypeDto {

    /**
     * Data leavetype code
     *
     * @type {string}
     * @memberof LeaveTypeDto
     */
    @ApiModelProperty({ description: 'Leavetype code', example: 'Annual Leave, Hospitalization, ...' })
    @IsNotEmpty()
    readonly code: string;

    /**
     * Data leavetype description
     *
     * @type {string}
     * @memberof LeaveTypeDto
     */
    @ApiModelProperty({ description: 'Leavetype description', example: 'This is annual/medical leave' })
    @IsNotEmpty()
    readonly description: string;
} 