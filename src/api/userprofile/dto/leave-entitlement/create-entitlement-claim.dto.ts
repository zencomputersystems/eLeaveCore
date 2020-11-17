import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
export class EntitlementClaimDetailsDTO {
  @ApiModelProperty({ description: 'User id', example: '507a60c0-18a5-11eb-ba6c-3972e8c82172' })
  @IsString()
  @IsNotEmpty()
  userId: string; // "bb8b692b-aca9-3a47-180c-68a139d47a35", 
  @ApiModelProperty({ description: 'Leave type id', example: '1b048af0-e066-11ea-865e-b132fb3666d0' })
  @IsString()
  @IsNotEmpty()
  leaveTypeId: string; // "85747738-66bf-8cb1-768a-d73319c61759", 
  @ApiModelProperty({ description: 'Number of days', example: '1.5' })
  @IsString()
  @IsNotEmpty()
  noOfDays: string; // 1
  @ApiModelProperty({ description: 'Expired date', example: '2020-12-12' })
  @IsString()
  @IsNotEmpty()
  expiredDate: string; //"2020-12-31"
}

export class CreateEntitlementClaimDTO {
  @ApiModelProperty({ description: 'Entitlement data', type: [EntitlementClaimDetailsDTO] })
  @IsArray()
  @IsNotEmpty()
  @Type(() => EntitlementClaimDetailsDTO)
  data: EntitlementClaimDetailsDTO[];
}