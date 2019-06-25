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
    @ApiModelProperty()
    @IsNotEmpty()
    leaveTypeID: string;

    /**
     * Data apply leave - reason
     *
     * @type {string}
     * @memberof ApplyLeaveDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    reason: string;

    /**
     * Data apply leave - data apply leave 
     *
     * @type {ApplyLeaveDataDTO[]}
     * @memberof ApplyLeaveDTO
     */
    @ApiModelProperty({ type: ApplyLeaveDataDTO })
    @Type(() => ApplyLeaveDataDTO)
    @ValidateNested()
    data: ApplyLeaveDataDTO[];
}