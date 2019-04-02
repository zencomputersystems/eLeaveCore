import { IsNotEmpty } from "class-validator";

export class ApprovedLeaveDTO {
    @IsNotEmpty()
    id: string;
}