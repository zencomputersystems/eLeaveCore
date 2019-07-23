import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { LeaveTypePropertiesXmlDTO } from './leavetype-properties.xml.dto';

/**
 * Data XML for Leavetype entitlement
 *
 * @export
 * @class LeaveTypeEntitlementXmlDTO
 */
export class LeaveTypeEntitlementXmlDTO {

    /**
     * Creates an instance of LeaveTypeEntitlementXmlDTO.
     * @memberof LeaveTypeEntitlementXmlDTO
     */
    constructor() {
        this.property = new LeaveTypePropertiesXmlDTO();
    }

    /**
     * Data leavetype entitlement - code
     *
     * @type {string}
     * @memberof LeaveTypeEntitlementXmlDTO
     */
    @ApiModelProperty( { description: 'Leavetype entitlement code', example: 'AL-generic'})
    @IsNotEmpty()
    code: string;

    /**
     * Data leavetype entitlement - description
     *
     * @type {string}
     * @memberof LeaveTypeEntitlementXmlDTO
     */
    @ApiModelProperty( { description: 'Entitlement description', example: 'Generic Annual Leave Entitlement'})
    @IsNotEmpty()
    description: string;

    /**
     * Data leavetype entitlement - properties
     *
     * @type {LeaveTypePropertiesXmlDTO}
     * @memberof LeaveTypeEntitlementXmlDTO
     */
    @ApiModelProperty({
        type: LeaveTypePropertiesXmlDTO,
        description: 'Policy properties'
    })
    @Type(() => LeaveTypePropertiesXmlDTO)
    @IsNotEmpty()
    @ValidateNested({ each: true })
    property: LeaveTypePropertiesXmlDTO;
}
