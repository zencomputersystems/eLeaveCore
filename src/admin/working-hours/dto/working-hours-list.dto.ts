import { ApiModelProperty } from '@nestjs/swagger';

export class WorkingHoursListDTO {

  @ApiModelProperty()
  code: string;

  @ApiModelProperty()
  role_guid: string;

  @ApiModelProperty()
  description: string;
}