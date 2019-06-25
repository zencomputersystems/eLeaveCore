import { UserEmergencyContactDetailDTO } from './xml/user-emergency-contact-detail.dto';
import { UserEducationDetailDTO } from './xml/user-education-detail.dto';
import { UserFamilyDTO } from './xml/user-family.dto';
import { IsNotEmpty, IsISO8601 } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * Data user personal detail
 *
 * @export
 * @class UserPersonalDetailDTO
 */
export class UserPersonalDetailDTO {

    /**
     *Creates an instance of UserPersonalDetailDTO.
     * @memberof UserPersonalDetailDTO
     */
    constructor() {
        this.nric = "";
        this.nickname = "";
        this.dob = new Date();
        this.gender = "";
        this.maritalStatus = "";
        this.race = "";
        this.religion = "";
        this.nationality = "";
        this.phoneNumber = "";
        this.workPhoneNumber = "";
        this.emailAddress = "";
        this.workEmailAddress = "";
        this.residentialAddress1 = "";
        this.residentialAddress2 = "";
        this.city = "";
        this.postcode = "";
        this.state = "";
        this.country = "";

        this.emergencyContactNumber = new UserEmergencyContactDetailDTO();
        this.education = new UserEducationDetailDTO();
        this.family = new UserFamilyDTO();
    }

    /**
     * Data user personal detail - nric
     *
     * @type {string}
     * @memberof UserPersonalDetailDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    nric: string;

    /**
     * Data user personal detail - nickname
     *
     * @type {string}
     * @memberof UserPersonalDetailDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    nickname: string;

    /**
     * Data user personal detail - dob
     *
     * @type {Date}
     * @memberof UserPersonalDetailDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    @IsISO8601()
    dob: Date;

    /**
     * Data user personal detail - gender
     *
     * @type {string}
     * @memberof UserPersonalDetailDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    gender: string;

    /**
     * Data user personal detail - marital status
     *
     * @type {string}
     * @memberof UserPersonalDetailDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    maritalStatus: string;

    /**
     * Data user personal detail - race
     *
     * @type {string}
     * @memberof UserPersonalDetailDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    race: string;

    /**
     * Data user personal detail - religion
     *
     * @type {string}
     * @memberof UserPersonalDetailDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    religion: string;

    /**
     * Data user personal detail - nationality
     *
     * @type {string}
     * @memberof UserPersonalDetailDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    nationality: string;

    /**
     * Data user personal detail - phone number
     *
     * @type {string}
     * @memberof UserPersonalDetailDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    phoneNumber: string;

    /**
     * Data user personal detail - work phone number
     *
     * @type {string}
     * @memberof UserPersonalDetailDTO
     */
    @ApiModelProperty()
    workPhoneNumber: string;

    /**
     * Data user personal detail - email address
     *
     * @type {string}
     * @memberof UserPersonalDetailDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    emailAddress: string;

    /**
     * Data user personal detail - work email address
     *
     * @type {string}
     * @memberof UserPersonalDetailDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    workEmailAddress: string;

    /**
     * Data user personal detail - residential address 1
     *
     * @type {string}
     * @memberof UserPersonalDetailDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    residentialAddress1: string;

    /**
     * Data user personal detail - residential address 2
     *
     * @type {string}
     * @memberof UserPersonalDetailDTO
     */
    @ApiModelProperty()
    residentialAddress2: string;

    /**
     * Data user personal detail - city
     *
     * @type {string}
     * @memberof UserPersonalDetailDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    city: string;

    /**
     * Data user personal detail - state
     *
     * @type {string}
     * @memberof UserPersonalDetailDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    state: string;

    /**
     * Data user personal detail - country
     *
     * @type {string}
     * @memberof UserPersonalDetailDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    country: string;

    /**
     * Data user personal detail - postcode
     *
     * @type {string}
     * @memberof UserPersonalDetailDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    postcode: string;

    /**
     * Data user personal detail - emergency contact number
     *
     * @type {UserEmergencyContactDetailDTO}
     * @memberof UserPersonalDetailDTO
     */
    @ApiModelProperty({ type: UserEmergencyContactDetailDTO })
    emergencyContactNumber: UserEmergencyContactDetailDTO;

    /**
     * Data user personal detail - education detail
     *
     * @type {UserEducationDetailDTO}
     * @memberof UserPersonalDetailDTO
     */
    @ApiModelProperty({ type: UserEducationDetailDTO })
    education: UserEducationDetailDTO;

    /**
     * Data user personal detail - family detail
     *
     * @type {UserFamilyDTO}
     * @memberof UserPersonalDetailDTO
     */
    @ApiModelProperty({ type: UserFamilyDTO })
    family: UserFamilyDTO;
}