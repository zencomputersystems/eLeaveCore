import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { LeaveTypeServiceYearXmlDTO } from './leavetype-serviceyear.xml.dto';

/**
 * Data XML for leavetype levels
 *
 * @export
 * @class LeaveTypeLevelsXmlDTO
 */
export class LeaveTypeLevelsXmlDTO {
    /**
     * Data eleavetype level - leave entitlement data
     *
     * @type {LeaveTypeServiceYearXmlDTO[]}
     * @memberof LeaveTypeLevelsXmlDTO
     */
    @ApiModelProperty({ type: [LeaveTypeServiceYearXmlDTO] })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => LeaveTypeServiceYearXmlDTO)
    readonly leaveEntitlement: LeaveTypeServiceYearXmlDTO[]
}