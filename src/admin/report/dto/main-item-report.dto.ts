import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class MainItemReportDto {

  @ApiModelProperty({ description: 'Department', example: 'RND' })
  @IsString()
  department: string;

  @ApiModelProperty({ description: 'Company Name', example: 'Zen Computer System Sdn. Bhd.' })
  @IsString()
  companyName: string;

  @ApiModelProperty({ description: 'Branch Name', example: 'Cyberjaya' })
  @IsString()
  branch: string;

  @ApiModelProperty({ description: 'Costcentre Name', example: 'Management' })
  @IsString()
  costcentre: string;
}