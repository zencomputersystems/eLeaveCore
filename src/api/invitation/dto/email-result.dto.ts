import { ApiModelProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

/**
 * Data for email result
 *
 * @export
 * @class EmailResultDTO
 */
export class EmailResultDTO {

    /**
     * Data email result - accepted
     *
     * @type {string}
     * @memberof EmailResultDTO
     */
    @ApiModelProperty()
    accepted: string;

    /**
     * Data email result - rejected
     *
     * @type {string}
     * @memberof EmailResultDTO
     */
    @ApiModelProperty()
    rejected: string;

    /**
     * Data email result - envelopetime
     *
     * @type {number}
     * @memberof EmailResultDTO
     */
    @ApiModelProperty()
    envelopeTime: number;

    /**
     * Data email result - messagetime
     *
     * @type {number}
     * @memberof EmailResultDTO
     */
    @ApiModelProperty()
    messageTime: number;

    /**
     * Data email result - messagesize
     *
     * @type {number}
     * @memberof EmailResultDTO
     */
    @ApiModelProperty()
    messageSize: number;

    /**
     * Data email result - response
     *
     * @type {string}
     * @memberof EmailResultDTO
     */
    @ApiModelProperty()
    response: string;

    /**
     * Data email result - email from
     *
     * @type {string}
     * @memberof EmailResultDTO
     */
    @ApiModelProperty()
    emailfrom: string;

    /**
     * Data email result - email to
     *
     * @type {string}
     * @memberof EmailResultDTO
     */
    @ApiModelProperty()
    emailto: string;

    /**
     * Data email result - message id
     *
     * @type {string}
     * @memberof EmailResultDTO
     */
    @ApiModelProperty()
    messageId: string;
}