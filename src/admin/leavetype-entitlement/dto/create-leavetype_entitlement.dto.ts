
import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { LeaveTypeEntitlementXmlDTO } from './xml/leavetype-entitlement.xml.dto';
import { identifier } from 'babel-types';

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
    @ApiModelProperty({ description: 'leavetype id', example: '238fc8fa-6e70-fa83-7c9b-17f77108b691' })
    @IsNotEmpty()
    readonly leavetype_id: string;
} 