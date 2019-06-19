import { ApiModelProperty } from '@nestjs/swagger';

/**
 *
 *
 * @export
 * @class UserBankDTO
 */
export class UserBankDTO {
    @ApiModelProperty()
    bankName: string;

    @ApiModelProperty()
    bankAccountNumber: string;
}