import { ApiModelProperty } from '@nestjs/swagger';

/**
 *
 *
 * @export
 * @class ActivatedResultDTO
 */
export class ActivatedResultDTO {
    @ApiModelProperty()
    status: boolean;

    @ApiModelProperty()
    message: string;

    @ApiModelProperty()
    authMethod: string;

    @ApiModelProperty()
    invitationId: string;

    @ApiModelProperty()
    userId: string;

    @ApiModelProperty()
    name: string;

    @ApiModelProperty()
    email: string;
}