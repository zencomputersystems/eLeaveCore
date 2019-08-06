import { IsNotEmpty, IsISO8601, IsString, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApplyLeaveDataDTO } from './apply-leave-data.dto';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * Data for apply leave
 *
 * @export
 * @class ApplyLeaveDTO
 */
export class ApplyLeaveDTO {

    /**
     * Data apply leave - leavetype id
     *
     * @type {string}
     * @memberof ApplyLeaveDTO
     */
    @ApiModelProperty({ description: 'Leavetype id', example: '238fc8fa-6e70-fa83-7c9b-17f77108b691' })
    @IsNotEmpty()
    leaveTypeID: string;

    /**
     * Data apply leave - reason
     *
     * @type {string}
     * @memberof ApplyLeaveDTO
     */
    @ApiModelProperty({ description: 'Reason for leave', example: 'Hari raya' })
    @IsNotEmpty()
    reason: string;

    /**
     * Data apply leave - data apply leave 
     *
     * @type {ApplyLeaveDataDTO[]}
     * @memberof ApplyLeaveDTO
     */
    @ApiModelProperty({
        type: ApplyLeaveDataDTO, description: 'Leave details', example: [{
            "startDate": "2019-08-14",
            "endDate": "2019-08-14",
            "dayType": 0,
            "slot": "",
            "quarterDay": ""
        }]
    })
    @Type(() => ApplyLeaveDataDTO)
    @ValidateNested()
    data: ApplyLeaveDataDTO[];
}