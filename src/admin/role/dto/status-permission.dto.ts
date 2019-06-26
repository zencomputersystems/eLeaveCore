import { ApiModelProperty } from "@nestjs/swagger";

/**
 * Data for status permission
 *
 * @export
 * @class StatusPermissionDTO
 */
export class StatusPermissionDTO {
    /**
     * Data for value
     *
     * @type {boolean}
     * @memberof StatusPermissionDTO
     */
    @ApiModelProperty()
    value: boolean;
}