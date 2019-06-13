import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
/**
 * base class leavetype dto
 *
 * @export
 * @class LeaveTypeDto
 */
export class LeaveTypeDto {
    
    @ApiModelProperty({description:'Leavetype code',example:'Annual Leave, Hospitalization, ...'})
    @IsNotEmpty()
    readonly code: string;

    @ApiModelProperty({description:'Leavetype description',example:'This is annual/medical leave'})
    @IsNotEmpty()
    readonly description: string;
} 