import { UserSpouseDTO } from './user-spouse.dto';

import { UserChildrenDTO } from './user-children.dto';

import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * UserFamily DTO - detailing family members
 *
 * @export
 * @class UserFamilyDTO
 */
export class UserFamilyDTO {
    @ApiModelProperty()
    @Type(() => UserSpouseDTO)
    @ValidateNested()
    spouse: UserSpouseDTO[];

    @ApiModelProperty()
    @Type(() => UserChildrenDTO)
    @ValidateNested()
    child: UserChildrenDTO[];
}