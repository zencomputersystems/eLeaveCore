import { LevelPermissionDTO } from './level-permission.dto';
import { StatusPermissionDTO } from './status-permission.dto';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Data allow leave management setup
 *
 * @export
 * @class AllowLeaveManagementSetupDTO
 */
export class AllowLeaveManagementSetupDTO {
    /**
     * Data allow leave adjustmane
     *
     * @type {LevelPermissionDTO}
     * @memberof AllowLeaveManagementSetupDTO
     */
    @ApiModelProperty({ description: 'Allow user to adjust leave', type: LevelPermissionDTO })
    @IsNotEmpty()
    @Type(() => LevelPermissionDTO)
    allowLeaveAdjustmant: LevelPermissionDTO;

    /**
     * Data allow apply on behalf
     *
     * @type {LevelPermissionDTO}
     * @memberof AllowLeaveManagementSetupDTO
     */
    @ApiModelProperty({ description: 'Allow user to apply on behalf', type: LevelPermissionDTO })
    @IsNotEmpty()
    @Type(() => LevelPermissionDTO)
    allowApplyOnBehalf: LevelPermissionDTO;

    /**
     * Data allow approval override
     *
     * @type {LevelPermissionDTO}
     * @memberof AllowLeaveManagementSetupDTO
     */
    @ApiModelProperty({ description: 'Allow user to override approval', type: LevelPermissionDTO })
    @IsNotEmpty()
    @Type(() => LevelPermissionDTO)
    allowApprovalOverride: LevelPermissionDTO;
}