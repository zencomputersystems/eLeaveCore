import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 *
 *
 * @export
 * @class UserCsvDto
 */
export class UserCsvDto {

    @ApiModelProperty()
    ID: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsEmail()
    STAFF_EMAIL: string;

    @ApiModelProperty()
    STAFF_ID: string;

    @ApiModelProperty()
    @IsNotEmpty()
    FULLNAME: string;

    @ApiModelProperty()
    IC_NUMBER: string;

    @ApiModelProperty()
    DOB: string;

    @ApiModelProperty()
    GENDER: string;

    @ApiModelProperty()
    PHONE_NUMBER: string;

    @ApiModelProperty()
    COMPANY_NUMBER: string;

    @ApiModelProperty()
    MARITAL_STATUS: string;

    @ApiModelProperty()
    ADDRESS: string;

    @ApiModelProperty()
    POSTCODE: string;

    @ApiModelProperty()
    STATE: string;

    @ApiModelProperty()
    COUNTRY: string;

    @ApiModelProperty()
    DESIGNATION: string;

    @ApiModelProperty()
    DEPARTMENT: string;

    @ApiModelProperty()
    COST_CENTRE: string;

    @ApiModelProperty()
    COMPANY: string;

    @ApiModelProperty()
    BRANCH: string;

    @ApiModelProperty()
    JOIN_DATE: string;

    @ApiModelProperty()
    CONFIRMATION_DATE: string;

    @ApiModelProperty()
    RESIGNATION_DATE: string;

    @ApiModelProperty()
    SUPERIOR_EMAIL: string;

}