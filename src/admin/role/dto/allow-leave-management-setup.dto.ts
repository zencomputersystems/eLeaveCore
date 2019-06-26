import { LevelPermissionDTO } from "./level-permission.dto";
import { StatusPermissionDTO } from "./status-permission.dto";
import { ApiModelProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";

/**
 * Data allow leave management setup
 *
 * @export
 * @class AllowLeaveManagementSetupDTO
 * @extends {StatusPermissionDTO}
 */
export class AllowLeaveManagementSetupDTO extends StatusPermissionDTO {
    /**
     * Data allow leave adjustmane
     *
     * @type {LevelPermissionDTO}
     * @memberof AllowLeaveManagementSetupDTO
     */
    @ApiModelProperty({ type: LevelPermissionDTO })
    @IsNotEmpty()
    @Type(() => LevelPermissionDTO)
    allowLeaveAdjustmant: LevelPermissionDTO;

    /**
     * Data allow apply on behalf
     *
     * @type {LevelPermissionDTO}
     * @memberof AllowLeaveManagementSetupDTO
     */
    @ApiModelProperty({ type: LevelPermissionDTO })
    @IsNotEmpty()
    @Type(() => LevelPermissionDTO)
    allowApplyOnBehalf: LevelPermissionDTO;

    /**
     * Data allow approval override
     *
     * @type {LevelPermissionDTO}
     * @memberof AllowLeaveManagementSetupDTO
     */
    @ApiModelProperty({ type: LevelPermissionDTO })
    @IsNotEmpty()
    @Type(() => LevelPermissionDTO)
    allowApprovalOverride: LevelPermissionDTO;
}