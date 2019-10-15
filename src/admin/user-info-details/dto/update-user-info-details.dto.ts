import { EmploymentDetailsDTO } from './employment-details.dto';
import { PersonalDetailsDTO } from './personal-details.dto';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUserInfoDetailsDTO {
  @ApiModelProperty({ description: 'Employment detail', type: EmploymentDetailsDTO })
  @IsNotEmpty()
  @Type(() => EmploymentDetailsDTO)
  employmentDetail: EmploymentDetailsDTO;

  @ApiModelProperty({ description: 'Notification rule - user guid to notify', example: "[\"bf1172cd-d950-343b-e3f2-60ebeb8afcf4\",\"D6B84686-DF26-48BA-9EC7-086ABEFEA74A\"]", })
  @IsNotEmpty()
  notificationRule: string[];

  @ApiModelProperty({ description: 'Personal details', type: PersonalDetailsDTO })
  @IsNotEmpty()
  @Type(() => PersonalDetailsDTO)
  personalDetails: PersonalDetailsDTO;
}
