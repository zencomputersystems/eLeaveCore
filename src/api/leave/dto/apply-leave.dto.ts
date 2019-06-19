import { IsNotEmpty, IsISO8601, IsString, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApplyLeaveDataDTO } from './apply-leave-data.dto';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 *
 *
 * @export
 * @class ApplyLeaveDTO
 */
export class ApplyLeaveDTO {

    @ApiModelProperty()
    @IsNotEmpty()
    leaveTypeID: string;

    @ApiModelProperty()
    @IsNotEmpty()
    reason: string;

    @ApiModelProperty({ type: ApplyLeaveDataDTO })
    @Type(() => ApplyLeaveDataDTO)
    @ValidateNested()
    data: ApplyLeaveDataDTO[];
}