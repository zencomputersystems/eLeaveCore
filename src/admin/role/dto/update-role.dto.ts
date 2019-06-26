import { RoleDTO } from "./role.dto";
import { ApiModelProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { Type } from "class-transformer";

/**
 * Data update role
 *
 * @export
 * @class UpdateRoleDTO
 */
export class UpdateRoleDTO {
    /**
     * Data update role - role_guid
     *
     * @type {string}
     * @memberof UpdateRoleDTO
     */
    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    role_guid: string;

    /**
     * Data update role - data
     *
     * @type {RoleDTO}
     * @memberof UpdateRoleDTO
     */
    @ApiModelProperty({ type: RoleDTO })
    @IsNotEmpty()
    @Type(() => RoleDTO)
    data: RoleDTO;
}