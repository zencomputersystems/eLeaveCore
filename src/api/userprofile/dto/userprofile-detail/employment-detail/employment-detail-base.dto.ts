import { ApiModelProperty } from '@nestjs/swagger';

import { IsString } from 'class-validator';

export class EmploymentDetailBase {
    @ApiModelProperty()
    @IsString()
    workLocation: string;

    @ApiModelProperty()
    @IsString()
    department: string;

    @ApiModelProperty()
    @IsString()
    branch: string;

    @ApiModelProperty()
    @IsString()
    division: string;

    @ApiModelProperty()
    @IsString()
    reportingTo: string;

    @ApiModelProperty()
    @IsString()
    bankAccountName: string;

    @ApiModelProperty()
    @IsString()
    bankAccountNumber: string;

    @ApiModelProperty()
    @IsString()
    epfNumber: string;

    @ApiModelProperty()
    @IsString()
    incomeTaxNumber: string;
}