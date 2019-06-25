import { ApiModelProperty } from '@nestjs/swagger';

/**
 * Data for user bank
 *
 * @export
 * @class UserBankDTO
 */
export class UserBankDTO {
    /**
     * Data user bank - bank name
     *
     * @type {string}
     * @memberof UserBankDTO
     */
    @ApiModelProperty()
    bankName: string;

    /**
     * Data user bank - bank account number
     *
     * @type {string}
     * @memberof UserBankDTO
     */
    @ApiModelProperty()
    bankAccountNumber: string;
}