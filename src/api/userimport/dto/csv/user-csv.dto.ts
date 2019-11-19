import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * Data for user csv
 *
 * @export
 * @class UserCsvDto
 */
export class UserCsvDto {

    /**
     * Data user csv - id
     *
     * @type {string}
     * @memberof UserCsvDto
     */
    @ApiModelProperty()
    ID: string;

    /**
     * Data user csv - staff email
     *
     * @type {string}
     * @memberof UserCsvDto
     */
    @ApiModelProperty()
    @IsNotEmpty()
    @IsEmail()
    STAFF_EMAIL: string;

    /**
     * Data user csv - staff id
     *
     * @type {string}
     * @memberof UserCsvDto
     */
    @ApiModelProperty()
    STAFF_ID: string;

    /**
     * Data user csv - fullname
     *
     * @type {string}
     * @memberof UserCsvDto
     */
    @ApiModelProperty()
    @IsNotEmpty()
    FULLNAME: string;

    /**
     * Data user csv - nickname
     *
     * @type {string}
     * @memberof UserCsvDto
     */
    @ApiModelProperty()
    @IsNotEmpty()
    NICKNAME: string;

    /**
     * Data user csv - ic number
     *
     * @type {string}
     * @memberof UserCsvDto
     */
    @ApiModelProperty()
    NRIC: string;

    /**
     * Data user csv - dob
     *
     * @type {string}
     * @memberof UserCsvDto
     */
    @ApiModelProperty()
    DOB: string;

    /**
     * Data user csv - gender
     *
     * @type {string}
     * @memberof UserCsvDto
     */
    @ApiModelProperty()
    GENDER: string;

    /**
     * Data user csv - phone number
     *
     * @type {string}
     * @memberof UserCsvDto
     */
    @ApiModelProperty()
    MOBILE_NUMBER: string;

    /**
     * Data user csv - company number
     *
     * @type {string}
     * @memberof UserCsvDto
     */
    @ApiModelProperty()
    WORK_NUMBER: string;

    /**
     * Data user csv - marital status
     *
     * @type {string}
     * @memberof UserCsvDto
     */
    @ApiModelProperty()
    MARITAL_STATUS: string;

    /**
     * Data user csv - address
     *
     * @type {string}
     * @memberof UserCsvDto
     */
    @ApiModelProperty()
    ADDRESS: string;

    /**
     * Data user csv - postcode
     *
     * @type {string}
     * @memberof UserCsvDto
     */
    @ApiModelProperty()
    POSTCODE: string;

    /**
     * Data user csv - state
     *
     * @type {string}
     * @memberof UserCsvDto
     */
    @ApiModelProperty()
    STATE: string;

    /**
     * Data user csv - country
     *
     * @type {string}
     * @memberof UserCsvDto
     */
    @ApiModelProperty()
    COUNTRY: string;

    /**
     * Data user csv - designation
     *
     * @type {string}
     * @memberof UserCsvDto
     */
    @ApiModelProperty()
    DESIGNATION: string;

    /**
     * Data user csv - department
     *
     * @type {string}
     * @memberof UserCsvDto
     */
    @ApiModelProperty()
    DEPARTMENT: string;

    /**
     * Data user csv - cost centre
     *
     * @type {string}
     * @memberof UserCsvDto
     */
    @ApiModelProperty()
    COST_CENTRE: string;

    /**
     *  Data user csv - branch
     *
     * @type {string}
     * @memberof UserCsvDto
     */
    @ApiModelProperty()
    BRANCH: string;

    /**
     * Data user csv - division
     *
     * @type {string}
     * @memberof UserCsvDto
     */
    @ApiModelProperty()
    DIVISION: string;

    /**
     * Data user csv - section
     *
     * @type {string}
     * @memberof UserCsvDto
     */
    @ApiModelProperty()
    SECTION: string;

    /**
     * Data user csv - company
     *
     * @type {string}
     * @memberof UserCsvDto
     */
    @ApiModelProperty()
    COMPANY: string;

    /**
     * Data user csv - join date
     *
     * @type {string}
     * @memberof UserCsvDto
     */
    @ApiModelProperty()
    JOIN_DATE: string;

    /**
     * Data user csv - confirmation date
     *
     * @type {string}
     * @memberof UserCsvDto
     */
    @ApiModelProperty()
    CONFIRMATION_DATE: string;

    /**
     * Data user csv - resignation date
     *
     * @type {string}
     * @memberof UserCsvDto
     */
    @ApiModelProperty()
    RESIGNATION_DATE: string;

    // /**
    //  * Data user csv - superior email
    //  *
    //  * @type {string}
    //  * @memberof UserCsvDto
    //  */
    // @ApiModelProperty()
    // SUPERIOR_EMAIL: string;

}