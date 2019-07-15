import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray } from 'class-validator';

/**
 * Data for notification rule
 *
 * @export
 * @class NotificationDTO
 */
export class NotificationDTO {

    /**
     * Array of employee guid
     *
     * @type {string[]}
     * @memberof NotificationDTO
     */
    @ApiModelProperty({ description: 'User guid for selected user', example: '["697b25ac-bff1-b1d1-f17e-fa0206fc7a2a","4C693DBE-4CC0-4DD1-9708-5E8FDFE35A83"]' })
    @IsArray()
    @IsNotEmpty()
    user_guid: string[];

    /**
     * Array of person notifier guid
     *
     * @type {string[]}
     * @memberof NotificationDTO
     */
    @ApiModelProperty({ description: 'Person guid to notify', example: '["bf1172cd-d950-343b-e3f2-60ebeb8afcf4","D6B84686-DF26-48BA-9EC7-086ABEFEA74A"]' })
    @IsArray()
    @IsNotEmpty()
    notifier_guid: string[];
}