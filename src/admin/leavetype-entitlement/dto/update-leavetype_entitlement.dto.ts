
import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { LeaveTypeEntitlementXmlDTO } from './xml/leavetype-entitlement.xml.dto';

/**
 *
 *
 * @export
 * @class UpdateLeaveTypeEntitlementDto
 * @extends {LeaveTypeEntitlementXmlDTO}
 */
export class UpdateLeaveTypeEntitlementDto extends LeaveTypeEntitlementXmlDTO{
    
    @ApiModelProperty()
    @IsNotEmpty()
    readonly id: string; 
} 