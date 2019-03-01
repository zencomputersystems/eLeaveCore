import { IsNotEmpty } from "class-validator";

export class UserEmergencyContactDTO {
    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    contactNumber: string;
}