import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsArray } from 'class-validator';

/**
 * Data for queue notifocation
 *
 * @export
 * @class QueueNotificationDTO
 */
export class QueueNotificationDTO {
    /**
     * Employee id
     *
     * @type {string}
     * @memberof QueueNotificationDTO
     */
    @ApiModelProperty({ description: 'User guid employee', example: '4C693DBE-4CC0-4DD1-9708-5E8FDFE35A83' })
    @IsString()
    @IsNotEmpty()
    employeeId: string;
    /**
     * Message
     *
     * @type {string}
     * @memberof QueueNotificationDTO
     */
    @ApiModelProperty({ description: 'Message notification', example: 'Jessie added a new announcement 6 minutes ago.' })
    @IsString()
    @IsNotEmpty()
    message: string;
    /**
     * Category notification
     *
     * @type {string}
     * @memberof QueueNotificationDTO
     */
    @ApiModelProperty({ description: 'Category of notification', example: 'new-announcement' })
    @IsString()
    @IsNotEmpty()
    category: string;
    /**
     * Remarks
     *
     * @type {*}
     * @memberof QueueNotificationDTO
     */
    @ApiModelProperty({ description: 'Remarks for notification', example: '{"employee_id":"4C693DBE-4CC0-4DD1-9708-5E8FDFE35A83"}' })
    @IsNotEmpty()
    remarks: any;
}