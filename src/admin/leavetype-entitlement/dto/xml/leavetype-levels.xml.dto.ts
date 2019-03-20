import { ApiModelProperty } from "@nestjs/swagger";
import { IsNotEmpty, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { LeaveTypeServiceYearXmlDTO } from "./leavetype-serviceyear.xml.dto";


export class LeaveTypeLevelsXmlDTO {
    @ApiModelProperty({type:LeaveTypeServiceYearXmlDTO})
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => LeaveTypeServiceYearXmlDTO)
    readonly leaveEntitlement: LeaveTypeServiceYearXmlDTO[]
}