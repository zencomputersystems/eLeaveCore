import { AllowLeaveSetupDTO } from './allow-leave-setup.dto';
import { LevelPermissionDTO } from './level-permission.dto';
import { AllowLeaveManagementSetupDTO } from './allow-leave-management-setup.dto';
import { AllowProfileManagementSetupDTO } from './allow-profile-management-setup.dto';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { StatusPermissionDTO } from './status-permission.dto';

/**
 * Data properties for role
 *
 * @export
 * @class RolePropertiesDTO
 */
export class RolePropertiesDTO {
    /**
     * Data allow leave setup
     *
     * @type {AllowLeaveSetupDTO}
     * @memberof RolePropertiesDTO
     */
    @ApiModelProperty({ description: 'Allow user to setup leave', type: AllowLeaveSetupDTO })
    @IsNotEmpty()
    @Type(() => AllowLeaveSetupDTO)
    allowLeaveSetup: AllowLeaveSetupDTO;

    /**
     * Data allow view report
     *
     * @type {LevelPermissionDTO}
     * @memberof RolePropertiesDTO
     */
    @ApiModelProperty({ description: 'Allow user to view report', type: LevelPermissionDTO })
    @IsNotEmpty()
    @Type(() => LevelPermissionDTO)
    allowViewReport: LevelPermissionDTO;

    /**
     * Data allow view calendar
     *
     * @type {LevelPermissionDTO}
     * @memberof RolePropertiesDTO
     */
    @ApiModelProperty({ description: 'Allow user to view calendar', type: LevelPermissionDTO })
    @IsNotEmpty()
    @Type(() => LevelPermissionDTO)
    allowViewCalendar: LevelPermissionDTO;

    /**
     * Data allow leave management setup
     *
     * @type {AllowLeaveManagementSetupDTO}
     * @memberof RolePropertiesDTO
     */
    @ApiModelProperty({ description: 'Allow user manage leave', type: AllowLeaveManagementSetupDTO })
    @IsNotEmpty()
    @Type(() => AllowLeaveManagementSetupDTO)
    allowLeaveManagement: AllowLeaveManagementSetupDTO;

    /**
     * Data allow profile management setup
     *
     * @type {AllowProfileManagementSetupDTO}
     * @memberof RolePropertiesDTO
     */
    @ApiModelProperty({ description: 'Allow user to manage profile', type: AllowProfileManagementSetupDTO })
    @IsNotEmpty()
    @Type(() => AllowProfileManagementSetupDTO)
    allowProfileManagement: AllowProfileManagementSetupDTO;

    /**
     * Data allow client setup
     *
     * @type {StatusPermissionDTO}
     * @memberof RolePropertiesDTO
     */
    @ApiModelProperty({ description: 'Allow setup client', type: StatusPermissionDTO })
    @IsNotEmpty()
    @Type(() => StatusPermissionDTO)
    allowClientSetup: StatusPermissionDTO;

    /**
     * Data allow attendance setup
     *
     * @type {StatusPermissionDTO}
     * @memberof RolePropertiesDTO
     */
    @ApiModelProperty({ description: 'Allow setup attendance', type: StatusPermissionDTO })
    @IsNotEmpty()
    @Type(() => StatusPermissionDTO)
    allowAttendanceSetup: StatusPermissionDTO;

}