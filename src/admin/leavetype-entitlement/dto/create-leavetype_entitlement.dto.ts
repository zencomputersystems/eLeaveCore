
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { LeaveTypeEntitlementXmlDTO } from './xml/leavetype-entitlement.xml.dto';

/**
 * Data for create leavetype entitlement type
 *
 * @export
 * @class CreateLeaveEntitlementTypeDTO
 * @extends {LeaveTypeEntitlementXmlDTO}
 */
export class CreateLeaveEntitlementTypeDTO extends LeaveTypeEntitlementXmlDTO {
    /**
     * Data create leaveentitlement - leavetype id
     *
     * @type {string}
     * @memberof CreateLeaveEntitlementTypeDTO
     */
    @ApiModelProperty({ description: 'Leave type GUID', example: 'paste leavety_guid here' })
    @IsNotEmpty()
    readonly leavetype_id: string;
}
