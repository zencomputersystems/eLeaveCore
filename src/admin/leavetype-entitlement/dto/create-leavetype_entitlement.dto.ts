
import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { LeaveTypeEntitlementXmlDTO } from './xml/leavetype-entitlement.xml.dto';

export class CreateLeaveEntitlementTypeDTO extends LeaveTypeEntitlementXmlDTO {
    @ApiModelProperty()
    @IsNotEmpty()
    readonly leavetype_id: string;
} 