import { IsNotEmpty } from "class-validator";

export class UserChildrenDTO {
    @IsNotEmpty()
    readonly childName: string;

    @IsNotEmpty()
    readonly childIdentificationNumber: string;
}