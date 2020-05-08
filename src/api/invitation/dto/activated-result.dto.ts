import { ApiModelProperty } from '@nestjs/swagger';

/**
 * Data activated result
 *
 * @export
 * @class ActivatedResultDTO
 */
export class ActivatedResultDTO {
    /**
     * Data activated result - status
     *
     * @type {boolean}
     * @memberof ActivatedResultDTO
     */
    @ApiModelProperty()
    status: boolean;

    /**
     * Data activated result - message
     *
     * @type {string}
     * @memberof ActivatedResultDTO
     */
    @ApiModelProperty()
    message: string;

    /**
     * Data activated result - authmethod
     *
     * @type {string}
     * @memberof ActivatedResultDTO
     */
    @ApiModelProperty()
    authMethod: string;

    /**
     * Data activated result - invitationid
     *
     * @type {string}
     * @memberof ActivatedResultDTO
     */
    @ApiModelProperty()
    invitationId: string;

    /**
     * Data activated result - userid
     *
     * @type {string}
     * @memberof ActivatedResultDTO
     */
    @ApiModelProperty()
    userId: string;

    /**
     * Data activated result - name
     *
     * @type {string}
     * @memberof ActivatedResultDTO
     */
    @ApiModelProperty()
    name: string;

    /**
     * Data activated result - email
     *
     * @type {string}
     * @memberof ActivatedResultDTO
     */
    @ApiModelProperty()
    email: string;

    /**
     * Data activated result - tenantId
     *
     * @type {string}
     * @memberof ActivatedResultDTO
     */
    @ApiModelProperty()
    tenantId: string;
}