import { ApiModelProperty } from "@nestjs/swagger";

/**
 * Data for role list
 *
 * @export
 * @class RoleListDTO
 */
export class RoleListDTO {
    /**
     * Data role list - code
     *
     * @type {string}
     * @memberof RoleListDTO
     */
    @ApiModelProperty()
    code: string;

    /**
     * Data role list - role_guid
     *
     * @type {string}
     * @memberof RoleListDTO
     */
    @ApiModelProperty()
    role_guid: string;

    /**
     * Data role list - description
     *
     * @type {string}
     * @memberof RoleListDTO
     */
    @ApiModelProperty()
    description: string;
}