
import { IsNotEmpty } from 'class-validator';
export class CreateBranchDto {
    @IsNotEmpty()
    readonly name: string;

} 