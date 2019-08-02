import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

/**
 * Data mail notification
 *
 * @export
 * @class MailNotificationDTO
 */
export class MailNotificationDTO {
    /**
     * Employee id
     *
     * @type {string}
     * @memberof MailNotificationDTO
     */
    @ApiModelProperty({ description: 'User guid employee', example: '4C693DBE-4CC0-4DD1-9708-5E8FDFE35A83' })
    @IsString()
    @IsNotEmpty()
    employeeId: string;

    /**
     * Date leave
     *
     * @type {string}
     * @memberof MailNotificationDTO
     */
    @ApiModelProperty({ description: 'Date of employee leave', example: '2019-07-15' })
    @IsString()
    @IsNotEmpty()
    dateLeave: string;
}