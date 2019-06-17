import { IsNotEmpty } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

/**
 *
 *
 * @export
 * @class ApprovedLeaveDTO
 */
export class ApprovedLeaveDTO {
    @ApiModelProperty()
    @IsNotEmpty()
    id: string;
}