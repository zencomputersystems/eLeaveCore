import { IsNotEmpty } from "class-validator";

export class UserChildrenDTO {
    @IsNotEmpty()
    childName: string;

    @IsNotEmpty()
    childIdentificationNumber: string;
}