
import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { LeaveTypeEntitlementXmlDTO } from './xml/leavetype-entitlement.xml.dto';

/**
 * Data update leavetype entitlement
 *
 * @export
 * @class UpdateLeaveTypeEntitlementDto
 * @extends {LeaveTypeEntitlementXmlDTO}
 */
export class UpdateLeaveTypeEntitlementDto extends LeaveTypeEntitlementXmlDTO {

    /**
     * Data update leavetype entitlement - id
     *
     * @type {string}
     * @memberof UpdateLeaveTypeEntitlementDto
     */
    @ApiModelProperty({ description: 'Leavetype id', example: '238fc8fa-6e70-fa83-7c9b-17f77108b691' })
    @IsNotEmpty()
    readonly id: string;
} 