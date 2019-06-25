import { UserSpouseDTO } from './user-spouse.dto';
import { UserChildrenDTO } from './user-children.dto';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * UserFamily DTO - detailing family members
 *
 * @export
 * @class UserFamilyDTO
 */
export class UserFamilyDTO {
    /**
     * Data user family - spouse detail
     *
     * @type {UserSpouseDTO[]}
     * @memberof UserFamilyDTO
     */
    @ApiModelProperty({ type: UserSpouseDTO })
    @Type(() => UserSpouseDTO)
    @ValidateNested()
    spouse: UserSpouseDTO[];

    /**
     * Data user emergency - child detail
     *
     * @type {UserChildrenDTO[]}
     * @memberof UserFamilyDTO
     */
    @ApiModelProperty({ type: UserChildrenDTO })
    @Type(() => UserChildrenDTO)
    @ValidateNested()
    child: UserChildrenDTO[];
}