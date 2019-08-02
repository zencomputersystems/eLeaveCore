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
     *Creates an instance of LeaveTypeEntitlementXmlDTO.
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
    @ApiModelProperty({ description: 'Leavetype code name', example: 'Annual Leave' })
    @IsNotEmpty()
    code: string;

    /**
     * Data leavetype entitlement - description
     *
     * @type {string}
     * @memberof LeaveTypeEntitlementXmlDTO
     */
    @ApiModelProperty({ description: 'details of leavetype', example: 'Annual leave for senior solution developer' })
    @IsNotEmpty()
    description: string;

    /**
     * Data leavetype entitlement - property
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
