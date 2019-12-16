import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * Data XML for leavetype service year
 *
 * @export
 * @class LeaveTypeServiceYearXmlDTO
 */
export class LeaveTypeServiceYearXmlDTO {

    /**
     * Data leavetype service - id
     *
     * @type {number}
     * @memberof LeaveTypeServiceYearXmlDTO
     */
    @ApiModelProperty({ description: 'Id for leavetype service year', example: 1 })
    @IsNotEmpty()
    id: number;

    /**
     * Data leavetype service - service year from
     *
     * @type {number}
     * @memberof LeaveTypeServiceYearXmlDTO
     */
    @ApiModelProperty({ description: 'Employee started service for company', example: 0 })
    @IsNotEmpty()
    @IsNumber()
    serviceYearFrom: number;

    /**
     * Data leavetype service - service year to
     *
     * @type {number}
     * @memberof LeaveTypeServiceYearXmlDTO
     */
    @ApiModelProperty({ description: 'Employee current service for company', example: 10 })
    @IsNotEmpty()
    @IsNumber()
    serviceYearTo: number;

    /**
     * Data leavetype service - entitleddays
     *
     * @type {number}
     * @memberof LeaveTypeServiceYearXmlDTO
     */
    @ApiModelProperty({ description: 'Leave amount that entitle for employee for current year', example: 14 })
    @IsNotEmpty()
    @IsNumber()
    entitledDays: number;

    /**
     * Data leavetype service - carry forward
     *
     * @type {number}
     * @memberof LeaveTypeServiceYearXmlDTO
     */
    @ApiModelProperty({ description: 'Leave balanced that can bring forward to next year', example: 3 })
    @IsNotEmpty()
    @IsNumber()
    carryForward: number;

}
