import { EmploymentDetailsDTO } from './employment-details.dto';
import { PersonalDetailsDTO } from './personal-details.dto';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class NotificationRuleDTO {
  @ApiModelProperty({ description: 'User guid to notify', example: '7756ab98-e69e-48e1-5fc3-b7e30a157cf3' })
  @IsNotEmpty()
  @IsString()
  id: string;
}

export class UpdateUserInfoDetailsDTO {
  @ApiModelProperty({ description: 'Employment detail', type: EmploymentDetailsDTO })
  @IsNotEmpty()
  @Type(() => EmploymentDetailsDTO)
  employmentDetail: EmploymentDetailsDTO;

  @ApiModelProperty({ description: 'Notification rule - user guid to notify', example: ["7756ab98-e69e-48e1-5fc3-b7e30a157cf3", "0cc543ea-2dc6-ce6e-d10d-a11a9e946c2f"] })
  @IsNotEmpty()
  @IsArray()
  notificationRule: string[];

  @ApiModelProperty({ description: 'Personal details', type: PersonalDetailsDTO })
  @IsNotEmpty()
  @Type(() => PersonalDetailsDTO)
  personalDetails: PersonalDetailsDTO;
}

export class UpdateUserInfoItemDTO {
  @ApiModelProperty({ description: 'Update User Info Details DTO', type: UpdateUserInfoDetailsDTO })
  @IsNotEmpty()
  @Type(() => UpdateUserInfoDetailsDTO)
  root: UpdateUserInfoDetailsDTO;
}
