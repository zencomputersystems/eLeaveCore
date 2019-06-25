import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsJSON } from 'class-validator';
import { isObject } from 'util';

/**
 * Data for rest day
 *
 * @export
 * @class RestDataDTO
 */
export class RestDataDTO {
    /**
     * Data rest day name (name of three character)
     *
     * @type {string}
     * @memberof RestDataDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    readonly name: string;

    /**
     * Data rest day fullname (fullname of day)
     *
     * @type {string}
     * @memberof RestDataDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    readonly fullname: string;
}