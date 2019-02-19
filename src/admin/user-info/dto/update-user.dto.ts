import { UserDto } from "./user.dto";
import { IsNotEmpty } from "class-validator";

export class UpdateUserDTO extends UserDto {
    @IsNotEmpty()
    readonly id: string;
}