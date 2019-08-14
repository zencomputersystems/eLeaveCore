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

    // /**
    //  * Tenant company guid
    //  *
    //  * @type {string}
    //  * @memberof LeaveTypeDto
    //  */
    // @ApiModelProperty({ description: 'Company guid', example: '323bdfa7-eed2-8bf2-2274-b1cd9390c9ca' })
    // @IsNotEmpty()
    // readonly companyId: string;
} 