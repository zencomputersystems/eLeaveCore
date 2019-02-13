
import { IsNotEmpty } from 'class-validator';
export class BranchDto {
    @IsNotEmpty()
    readonly name: string;

} 