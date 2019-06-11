import { IsNotEmpty, IsISO8601, IsString, IsNumber, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ApplyLeaveDataDTO } from "./apply-leave-data.dto";

export class ApplyLeaveDTO {

    @IsNotEmpty()
    leaveTypeID: string;

    @IsNotEmpty()
    reason: string;

    @Type(() => ApplyLeaveDataDTO)
    @ValidateNested()
    data: ApplyLeaveDataDTO[];
}