
import { IsNotEmpty } from 'class-validator';
export class UpdateBranchDto {

    @IsNotEmpty()
    readonly id: string;

    @IsNotEmpty()
    readonly name: string;

} 