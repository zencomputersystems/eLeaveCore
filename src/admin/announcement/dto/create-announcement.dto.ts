import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsISO8601, IsNumber, IsOptional } from 'class-validator';

/**
 * Data to create announcement
 *
 * @export
 * @class CreateAnnouncementDto
 */
export class CreateAnnouncementDto {
  /**
   * Title of announcement
   *
   * @type {string}
   * @memberof CreateAnnouncementDto
   */
  @ApiModelProperty({ description: 'Title of announcement', example: 'Notice of requirement to take annual leave for Hari Raya festival' })
  @IsNotEmpty()
  @IsString()
  title: string;

  /**
   * Message of announcement
   *
   * @type {string}
   * @memberof CreateAnnouncementDto
   */
  @ApiModelProperty({
    description: 'Message of announcement',
    example: `Dear all,

  In accordance with Hari Raya celebration, we would like to request all staff to take 1 day annual leave due to a close down of operations on 7 June 2019. Kindly apply annual leave for the low productivity period and take this as an opportunity to have a substantial break for family. 
  
  This is not applicable to Manage365 and backup of Resident Engineer.
  `})
  @IsNotEmpty()
  @IsString()
  message: string;

  /**
   * Pinned the announcement
   *
   * @type {number}
   * @memberof CreateAnnouncementDto
   */
  @ApiModelProperty({ description: 'Pinned post announcement', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  isPinned: number;

  /**
   * Attachment filename
   *
   * @type {string[]}
   * @memberof CreateAnnouncementDto
   */
  @ApiModelProperty({
    description: 'Attachment file announcement',
    example: `["779419_firstfile.png","6987604_secondfile.jpg"]`
  })
  @IsOptional()
  attachment: string[];
}