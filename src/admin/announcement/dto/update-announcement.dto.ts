import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

/**
 * Data for announcement
 *
 * @export
 * @class UpdateAnnouncementDto
 */
export class UpdateAnnouncementDto {
  /**
   * Announcement id
   *
   * @type {string}
   * @memberof UpdateAnnouncementDto
   */
  @ApiModelProperty({ description: 'Announcement guid', example: 'BHKHJ*&^GBYUHIB*&YHBI978' })
  @IsNotEmpty()
  @IsString()
  announcementId: string;

  /**
   * Announcement title
   *
   * @type {string}
   * @memberof UpdateAnnouncementDto
   */
  @ApiModelProperty({ description: 'Title announcement', example: 'Please apply leave on 11 September' })
  @IsNotEmpty()
  @IsString()
  title: string;

  /**
   * Announcement title
   *
   * @type {string}
   * @memberof UpdateAnnouncementDto
   */
  @ApiModelProperty({
    description: 'Message announcement',
    example: `We are gonna close our office on 11 september. All employee need to apply leave 3 days before the date`
  })
  @IsNotEmpty()
  @IsString()
  message: string;

  /**
   * Pinned the announcement
   *
   * @type {number}
   * @memberof UpdateAnnouncementDto
   */
  @ApiModelProperty({ description: 'Pinned post announcement', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  isPinned: number;

  /**
   * Attachment filename
   *
   * @type {string[]}
   * @memberof UpdateAnnouncementDto
   */
  @ApiModelProperty({
    description: 'Attachment file announcement',
    example: `["779419_firstfile.png","6987604_secondfile.jpg"]`
  })
  @IsOptional()
  attachment: string[];
}