import { IsNotEmpty } from "class-validator";

export class UserEmergencyContactDTO {
    @IsNotEmpty()
    contactName: string;
    
    @IsNotEmpty()
    contactNumber: string;
}