import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class WorkingHoursDTO {

  @ApiModelProperty()
  @IsString()
  code: string;

  @ApiModelProperty()
  @IsString()
  description: string;

  // @ApiModelProperty({ description: 'Properties role', type: RolePropertiesDTO })
  // @IsNotEmpty()
  // @Type(() => RolePropertiesDTO)
  // property: RolePropertiesDTO;

  @ApiModelProperty({ description: 'Properties working hours' })
  @IsNotEmpty()
  property: string;
}