import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { LeaveTypePropertiesXmlDTO } from './leavetype-properties.xml.dto';

/**
 *
 *
 * @export
 * @class LeaveTypeEntitlementXmlDTO
 */
export class LeaveTypeEntitlementXmlDTO {

    constructor() {
        this.properties = new LeaveTypePropertiesXmlDTO();
    }

    @ApiModelProperty()
    @IsNotEmpty()
    code: string;

    @ApiModelProperty()
    @IsNotEmpty()
    description: string;

    @ApiModelProperty({
        type:LeaveTypePropertiesXmlDTO,
        description: 'Policy properties'
    })
    @Type(() => LeaveTypePropertiesXmlDTO)
    @IsNotEmpty()
    @ValidateNested({ each: true })
    properties: LeaveTypePropertiesXmlDTO;
} 