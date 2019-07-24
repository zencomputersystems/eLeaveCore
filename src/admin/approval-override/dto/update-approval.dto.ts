import { ApiModelProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class UpdateApprovalDTO {

  @ApiModelProperty({ description: 'Leave transaction guid', example: '["b022d1b1-ff12-9cdf-2272-8c01cb75fbe0"]' })
  @IsArray()
  @IsNotEmpty()
  leaveTransactionId: string[];

  @ApiModelProperty({ description: 'Status approval override', example: 'APPROVED' })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiModelProperty({ description: 'Remark approval override', example: 'Hari raya leave' })
  @IsString()
  @IsNotEmpty()
  remark:string;
}