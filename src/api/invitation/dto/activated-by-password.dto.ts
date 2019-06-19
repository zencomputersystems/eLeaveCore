import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 *
 *
 * @export
 * @class ActivatedByPassword
 */
export class ActivatedByPassword {
    @ApiModelProperty()
    @IsNotEmpty()
    password: string;

    @ApiModelProperty()
    // invitation guid
    @IsNotEmpty()
    id: string;
}