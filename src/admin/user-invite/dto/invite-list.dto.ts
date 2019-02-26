import { InviteDto } from "./invite.dto";
import { ApiModelProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, ValidateNested } from "class-validator";

export class InviteListDTO {
    
    @Type(() => InviteListDTO)
    @IsNotEmpty()
    @ValidateNested()
    readonly inviteIdList : InviteDto[]
}