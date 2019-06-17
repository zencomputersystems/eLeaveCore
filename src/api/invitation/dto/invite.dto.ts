import { IsNotEmpty } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

/**
 *
 *
 * @export
 * @class InviteDTO
 */
export class InviteDTO {
    @ApiModelProperty()
    @IsNotEmpty()
    id: string; //user_GUID
}