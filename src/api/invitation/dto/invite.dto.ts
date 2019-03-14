import { IsNotEmpty } from "class-validator";

export class InviteDTO {
    @IsNotEmpty()
    id: string; //user_GUID
}