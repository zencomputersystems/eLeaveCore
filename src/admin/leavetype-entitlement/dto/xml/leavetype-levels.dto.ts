import { ApiModelProperty } from "@nestjs/swagger";
import { LeaveTypeServiceYearDto } from "./leavetype-serviceyear.dto";
import { IsNotEmpty, ValidateNested } from "class-validator";
import { Type } from "class-transformer";


export class LeaveTypeLevelsDTO {
    @ApiModelProperty({type:LeaveTypeServiceYearDto})
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => LeaveTypeServiceYearDto)
    readonly leaveEntitlement: LeaveTypeServiceYearDto[]
}