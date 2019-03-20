import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class LeaveTypeServiceYearXmlDTO {

    @ApiModelProperty({description:'Id for service year'})
    @IsNotEmpty()
    id: string;

    @ApiModelProperty({description:'Employee started service for company'})
    @IsNotEmpty()
    @IsNumber()
    serviceYearFrom: number;

    @ApiModelProperty({description:'Employee current service for company'})
    @IsNotEmpty()
    @IsNumber()
    serviceYearTo: number;

    @ApiModelProperty({description:'Leave amount that entitle for employee for current year'})
    @IsNotEmpty()
    @IsNumber()
    entitledDays: number;

    @ApiModelProperty({description:'Leave balanced that can bring forward to next year'})
    @IsNotEmpty()
    @IsNumber()
    carryForward: number;

}