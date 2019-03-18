import { IsNotEmpty, IsString } from "class-validator";

export class AssignLeavePolicyDTO {

    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsString()
    leaveTypeId: string;

    @IsNotEmpty()
    @IsString()
    leaveEntitlementId: string;
}