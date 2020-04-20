import { EmploymentDetailsDTO } from './employment-details.dto';
import { PersonalDetailsDTO } from './personal-details.dto';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Data notification rule
 *
 * @export
 * @class NotificationRuleDTO
 */
export class NotificationRuleDTO {
  /**
   * Notification id
   *
   * @type {string}
   * @memberof NotificationRuleDTO
   */
  @ApiModelProperty({ description: 'User guid to notify', example: '7756ab98-e69e-48e1-5fc3-b7e30a157cf3' })
  // @IsNotEmpty()
  @IsString()
  @IsOptional()
  id: string;
}

/**
 * Data update user info details
 *
 * @export
 * @class UpdateUserInfoDetailsDTO
 */
export class UpdateUserInfoDetailsDTO {
  /**
   * Employment details
   *
   * @type {EmploymentDetailsDTO}
   * @memberof UpdateUserInfoDetailsDTO
   */
  @ApiModelProperty({ description: 'Employment detail', type: EmploymentDetailsDTO })
  @IsNotEmpty()
  @Type(() => EmploymentDetailsDTO)
  employmentDetail: EmploymentDetailsDTO;

  /**
   * Notification rule
   *
   * @type {string[]}
   * @memberof UpdateUserInfoDetailsDTO
   */
  @ApiModelProperty({ description: 'Notification rule - user guid to notify', example: ["7756ab98-e69e-48e1-5fc3-b7e30a157cf3", "0cc543ea-2dc6-ce6e-d10d-a11a9e946c2f"] })
  @IsNotEmpty()
  @IsArray()
  notificationRule: string[];

  /**
   * Personal details
   *
   * @type {PersonalDetailsDTO}
   * @memberof UpdateUserInfoDetailsDTO
   */
  @ApiModelProperty({ description: 'Personal details', type: PersonalDetailsDTO })
  @IsNotEmpty()
  @Type(() => PersonalDetailsDTO)
  personalDetails: PersonalDetailsDTO;
}

/**
 * Data update user info items
 *
 * @export
 * @class UpdateUserInfoItemDTO
 */
export class UpdateUserInfoItemDTO {
  /**
   * Root xml structure
   *
   * @type {UpdateUserInfoDetailsDTO}
   * @memberof UpdateUserInfoItemDTO
   */
  @ApiModelProperty({ description: 'Update User Info Details DTO', type: UpdateUserInfoDetailsDTO })
  @IsNotEmpty()
  @Type(() => UpdateUserInfoDetailsDTO)
  root: UpdateUserInfoDetailsDTO;
}
