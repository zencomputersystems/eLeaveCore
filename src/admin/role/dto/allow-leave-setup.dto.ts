import { StatusPermissionDTO } from './status-permission.dto';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Data to allow setup leave
 *
 * @export
 * @class AllowLeaveSetupDTO
 */
export class AllowLeaveSetupDTO {
    /**
     * Allow setup leavetype
     *
     * @type {StatusPermissionDTO}
     * @memberof AllowLeaveSetupDTO
     */
    @ApiModelProperty({ description: 'Allow setup leavetype', type: StatusPermissionDTO })
    @IsNotEmpty()
    @Type(() => StatusPermissionDTO)
    allowLeaveTypeSetup: StatusPermissionDTO;

    /**
     * Allow setup leave entitlement
     *
     * @type {StatusPermissionDTO}
     * @memberof AllowLeaveSetupDTO
     */
    @ApiModelProperty({ description: 'Allow setup leave entitlement', type: StatusPermissionDTO })
    @IsNotEmpty()
    @Type(() => StatusPermissionDTO)
    allowLeaveEntitlementSetup: StatusPermissionDTO;

    /**
     * Allow setup approval group
     *
     * @type {StatusPermissionDTO}
     * @memberof AllowLeaveSetupDTO
     */
    @ApiModelProperty({ description: 'Allow setup approval group', type: StatusPermissionDTO })
    @IsNotEmpty()
    @Type(() => StatusPermissionDTO)
    allowApprovalGroupSetup: StatusPermissionDTO;

    /**
     * Allow setup year end closing
     *
     * @type {StatusPermissionDTO}
     * @memberof AllowLeaveSetupDTO
     */
    @ApiModelProperty({ description: 'Allow setup year end closing', type: StatusPermissionDTO })
    @IsNotEmpty()
    @Type(() => StatusPermissionDTO)
    allowYearEndClosingSetup: StatusPermissionDTO;
}