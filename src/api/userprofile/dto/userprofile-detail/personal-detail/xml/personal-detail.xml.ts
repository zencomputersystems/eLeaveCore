import { IsNotEmpty, IsNumber, IsString, ValidateNested, IsISO8601 } from 'class-validator';
import { Type } from 'class-transformer';
import { UserEmergencyContactDetailDTO } from './user-emergency-contact-detail.dto';
import { UserEducationDetailDTO } from './user-education-detail.dto';
import { UserFamilyDTO } from './user-family.dto';
import { UserCertificationDetailDTO } from '../../employment-detail/xml/user-certification-detail.dto';
import { ApiModelProperty } from '@nestjs/swagger';
import { type } from 'os';


/**
 * Data for personal detail
 *
 * @export
 * @class PersonalDetailXML
 */
export class PersonalDetailXML {
    /**
     * Data personal detail - id
     *
     * @type {string}
     * @memberof PersonalDetailXML
     */
    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    id: string;

    /**
     * Data personal detail - nickname
     *
     * @type {string}
     * @memberof PersonalDetailXML
     */
    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    nickname: string;

    /**
     * Data personal detail - nric
     *
     * @type {string}
     * @memberof PersonalDetailXML
     */
    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    nric: string;

    /**
     * Data personal detail - dob
     *
     * @type {Date}
     * @memberof PersonalDetailXML
     */
    @ApiModelProperty()
    @IsNotEmpty()
    @IsISO8601()
    dob: Date;

    /**
     * Data personal detail - gender
     *
     * @type {number}
     * @memberof PersonalDetailXML
     */
    @ApiModelProperty()
    @IsNotEmpty()
    @IsNumber()
    gender: number;

    /**
     * Data personal detail - marital status
     *
     * @type {number}
     * @memberof PersonalDetailXML
     */
    @ApiModelProperty()
    @IsNotEmpty()
    @IsNumber()
    maritalStatus: number;

    /**
     * Data personal detail - race
     *
     * @type {string}
     * @memberof PersonalDetailXML
     */
    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    race: string;

    /**
     * Data personal detail - religion
     *
     * @type {string}
     * @memberof PersonalDetailXML
     */
    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    religion: string;

    /**
     * Data personal detail - nationality
     *
     * @type {string}
     * @memberof PersonalDetailXML
     */
    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    nationality: string;

    /**
     * Data personal detail - phone number
     *
     * @type {string}
     * @memberof PersonalDetailXML
     */
    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    phoneNumber: string;

    /**
     * Data personal detail -  work phone number
     *
     * @type {string}
     * @memberof PersonalDetailXML
     */
    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    workPhoneNumber: string;

    /**
     * Data personal detail - email address
     *
     * @type {string}
     * @memberof PersonalDetailXML
     */
    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    emailAddress: string;

    /**
     * Data personal detail - work email address
     *
     * @type {string}
     * @memberof PersonalDetailXML
     */
    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    workEmailAddress: string;

    /**
     * Data personal detail - address 1
     *
     * @type {string}
     * @memberof PersonalDetailXML
     */
    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    address1: string;

    /**
     * Data personal detail - address 2
     *
     * @type {string}
     * @memberof PersonalDetailXML
     */
    @ApiModelProperty()
    @IsString()
    address2: string;

    /**
     * Data personal detail - postcode
     *
     * @type {string}
     * @memberof PersonalDetailXML
     */
    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    postcode: string;

    /**
     * Data personal detail - city
     *
     * @type {string}
     * @memberof PersonalDetailXML
     */
    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    city: string;

    /**
     * Data personal detail - state
     *
     * @type {string}
     * @memberof PersonalDetailXML
     */
    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    state: string;

    /**
     * Data personal detail - country
     *
     * @type {string}
     * @memberof PersonalDetailXML
     */
    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    country: string;

    /**
     * Data personal detail - emergency contact
     *
     * @type {UserEmergencyContactDetailDTO}
     * @memberof PersonalDetailXML
     */
    @ApiModelProperty({ type: UserEmergencyContactDetailDTO })
    @Type(() => UserEmergencyContactDetailDTO)
    @ValidateNested()
    @IsNotEmpty()
    emergencyContact: UserEmergencyContactDetailDTO;

    /**
     * Data personal detail - education
     *
     * @type {UserEducationDetailDTO}
     * @memberof PersonalDetailXML
     */
    @ApiModelProperty({ type: UserEducationDetailDTO })
    // education info
    @Type(() => UserEducationDetailDTO)
    @ValidateNested()
    education: UserEducationDetailDTO;

    /**
     * Data personal detail - certification
     *
     * @type {UserCertificationDetailDTO}
     * @memberof PersonalDetailXML
     */
    @ApiModelProperty({ type: UserCertificationDetailDTO })
    @Type(() => UserCertificationDetailDTO)
    @ValidateNested()
    certification: UserCertificationDetailDTO;

    /**
     * Data personal detail - family
     *
     * @type {UserFamilyDTO}
     * @memberof PersonalDetailXML
     */
    @ApiModelProperty({ type: UserFamilyDTO })
    @Type(() => UserFamilyDTO)
    @ValidateNested()
    family: UserFamilyDTO
}