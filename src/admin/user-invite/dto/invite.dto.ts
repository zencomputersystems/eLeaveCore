import { IsNotEmpty, IsEmail } from "class-validator";

export class InviteDto {

    @IsNotEmpty()
    readonly id: string;
}
