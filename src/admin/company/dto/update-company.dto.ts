import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateCompanyDTO{
    @ApiModelProperty()
    @IsNotEmpty()
    id:string;

    @ApiModelProperty()
    @IsNotEmpty()
    name:string;
}