import { IsNotEmpty, IsEmail } from "class-validator";

export class InviteDto {

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
}
