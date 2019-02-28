import { IsNotEmpty } from "class-validator";

export class ActivatedByPassword {
    @IsNotEmpty()
    password: string;

    // invitation guid
    @IsNotEmpty()
    id: string;
}