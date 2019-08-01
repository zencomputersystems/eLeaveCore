
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
    @ApiModelProperty()
    @IsNotEmpty()
    readonly id: string;
}
