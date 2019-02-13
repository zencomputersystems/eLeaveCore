
import { IsNotEmpty } from 'class-validator';
import { BranchDto } from './branch.dto';
export class UpdateBranchDto extends BranchDto {

    @IsNotEmpty()
    readonly id: string;


} 