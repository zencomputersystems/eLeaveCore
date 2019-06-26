import { StatusPermissionDTO } from "./status-permission.dto";
import { ApiModelProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";

/**
 * Role for allow leave setup
 *
 * @export
 * @class AllowLeaveSetupDTO
 * @extends {StatusPermissionDTO}
 */
export class AllowLeaveSetupDTO extends StatusPermissionDTO {
    /**
     * Allow setup leavetype
     *
     * @type {StatusPermissionDTO}
     * @memberof AllowLeaveSetupDTO
     */
    @ApiModelProperty({ type: StatusPermissionDTO })
    @IsNotEmpty()
    @Type(() => StatusPermissionDTO)
    allowLeaveTypeSetup: StatusPermissionDTO;

    /**
     * Allow setup leave entitlement
     *
     * @type {StatusPermissionDTO}
     * @memberof AllowLeaveSetupDTO
     */
    @ApiModelProperty({ type: StatusPermissionDTO })
    @IsNotEmpty()
    @Type(() => StatusPermissionDTO)
    allowLeaveEntitlementSetup: StatusPermissionDTO;

    /**
     * Allow setup approval group
     *
     * @type {StatusPermissionDTO}
     * @memberof AllowLeaveSetupDTO
     */
    @ApiModelProperty({ type: StatusPermissionDTO })
    @IsNotEmpty()
    @Type(() => StatusPermissionDTO)
    allowApprovalGroupSetup: StatusPermissionDTO;

    /**
     * Allow setup year end closing
     *
     * @type {StatusPermissionDTO}
     * @memberof AllowLeaveSetupDTO
     */
    @ApiModelProperty({ type: StatusPermissionDTO })
    @IsNotEmpty()
    @Type(() => StatusPermissionDTO)
    allowYearEndClosingSetup: StatusPermissionDTO;
}