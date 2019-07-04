import { StatusPermissionDTO } from "./status-permission.dto";
import { LevelPermissionDTO } from "./level-permission.dto";
import { ApiModelProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";

/**
 *
 *
 * @export
 * @class AllowProfileManagementSetupDTO
 */
export class AllowProfileManagementSetupDTO {
    /**
     * Data allow view profile
     *
     * @type {LevelPermissionDTO}
     * @memberof AllowProfileManagementSetupDTO
     */
    @ApiModelProperty({ type: LevelPermissionDTO })
    @IsNotEmpty()
    @Type(() => LevelPermissionDTO)
    allowViewProfile: LevelPermissionDTO;

    /**
     * Data allow edit profile
     *
     * @type {LevelPermissionDTO}
     * @memberof AllowProfileManagementSetupDTO
     */
    @ApiModelProperty({ type: LevelPermissionDTO })
    @IsNotEmpty()
    @Type(() => LevelPermissionDTO)
    allowEditProfile: LevelPermissionDTO;

    /**
     * Data allow change password
     *
     * @type {LevelPermissionDTO}
     * @memberof AllowProfileManagementSetupDTO
     */
    @ApiModelProperty({ type: LevelPermissionDTO })
    @IsNotEmpty()
    @Type(() => LevelPermissionDTO)
    allowChangePassword: LevelPermissionDTO;

    /**
     * Data allow profile admin
     *
     * @type {LevelPermissionDTO}
     * @memberof AllowProfileManagementSetupDTO
     */
    @ApiModelProperty({ type: LevelPermissionDTO })
    @IsNotEmpty()
    @Type(() => LevelPermissionDTO)
    allowProfileAdmin: LevelPermissionDTO;
}