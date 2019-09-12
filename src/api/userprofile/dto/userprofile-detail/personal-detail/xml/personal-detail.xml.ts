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
    @ApiModelProperty({ description: 'Id', example: '2345731a-f3e3-1b0b-de05-d1a6c7c50447' })
    @IsNotEmpty()
    @IsString()
    id: string;

    /**
     * Data personal detail - nickname
     *
     * @type {string}
     * @memberof PersonalDetailXML
     */
    @ApiModelProperty({ description: 'Nickname', example: 'Justin' })
    @IsNotEmpty()
    @IsString()
    nickname: string;

    /**
     * Data personal detail - nric
     *
     * @type {string}
     * @memberof PersonalDetailXML
     */
    @ApiModelProperty({ description: 'Identification number', example: '901211108813' })
    @IsNotEmpty()
    @IsString()
    nric: string;

    /**
     * Data personal detail - dob
     *
     * @type {Date}
     * @memberof PersonalDetailXML
     */
    @ApiModelProperty({ description: 'Data of birth', example: '1990-12-11' })
    @IsNotEmpty()
    @IsISO8601()
    dob: Date;

    /**
     * Data personal detail - gender
     *
     * @type {number}
     * @memberof PersonalDetailXML
     */
    @ApiModelProperty({ description: 'Gender', example: 1 })
    @IsNotEmpty()
    @IsNumber()
    gender: number;

    /**
     * Data personal detail - marital status
     *
     * @type {number}
     * @memberof PersonalDetailXML
     */
    @ApiModelProperty({ description: 'Marital status', example: 1 })
    @IsNotEmpty()
    @IsNumber()
    maritalStatus: number;

    /**
     * Data personal detail - race
     *
     * @type {string}
     * @memberof PersonalDetailXML
     */
    @ApiModelProperty({ description: 'Race', example: 'Malay' })
    @IsNotEmpty()
    @IsString()
    race: string;

    /**
     * Data personal detail - religion
     *
     * @type {string}
     * @memberof PersonalDetailXML
     */
    @ApiModelProperty({ description: 'Religion', example: 'Islam' })
    @IsNotEmpty()
    @IsString()
    religion: string;

    /**
     * Data personal detail - nationality
     *
     * @type {string}
     * @memberof PersonalDetailXML
     */
    @ApiModelProperty({ description: 'Nationality', example: 'Malaysian' })
    @IsNotEmpty()
    @IsString()
    nationality: string;

    /**
     * Data personal detail - phone number
     *
     * @type {string}
     * @memberof PersonalDetailXML
     */
    @ApiModelProperty({ description: 'Phone number', example: '0173331441' })
    @IsNotEmpty()
    @IsString()
    phoneNumber: string;

    /**
     * Data personal detail -  work phone number
     *
     * @type {string}
     * @memberof PersonalDetailXML
     */
    @ApiModelProperty({ description: 'Work phone number', example: '0198883123' })
    @IsNotEmpty()
    @IsString()
    workPhoneNumber: string;

    /**
     * Data personal detail - email address
     *
     * @type {string}
     * @memberof PersonalDetailXML
     */
    @ApiModelProperty({ description: 'Email address', example: 'tarmimi@gmail.com' })
    @IsNotEmpty()
    @IsString()
    emailAddress: string;

    /**
     * Data personal detail - work email address
     *
     * @type {string}
     * @memberof PersonalDetailXML
     */
    @ApiModelProperty({ description: 'Work email address', example: 'tarmimi@zen.com.my' })
    @IsNotEmpty()
    @IsString()
    workEmailAddress: string;

    /**
     * Data personal detail - address 1
     *
     * @type {string}
     * @memberof PersonalDetailXML
     */
    @ApiModelProperty({ description: 'Address', example: 'Unit No. A-6-2, Block A' })
    @IsNotEmpty()
    @IsString()
    address1: string;

    /**
     * Data personal detail - address 2
     *
     * @type {string}
     * @memberof PersonalDetailXML
     */
    @ApiModelProperty({ description: 'Address 2', example: 'Persiaran Ceria, Cyber 12' })
    @IsString()
    address2: string;

    /**
     * Data personal detail - postcode
     *
     * @type {string}
     * @memberof PersonalDetailXML
     */
    @ApiModelProperty({ description: 'Postcode', example: '63000' })
    @IsNotEmpty()
    @IsString()
    postcode: string;

    /**
     * Data personal detail - city
     *
     * @type {string}
     * @memberof PersonalDetailXML
     */
    @ApiModelProperty({ description: 'City', example: 'Cyberjaya' })
    @IsNotEmpty()
    @IsString()
    city: string;

    /**
     * Data personal detail - state
     *
     * @type {string}
     * @memberof PersonalDetailXML
     */
    @ApiModelProperty({ description: 'State', example: 'Selangor' })
    @IsNotEmpty()
    @IsString()
    state: string;

    /**
     * Data personal detail - country
     *
     * @type {string}
     * @memberof PersonalDetailXML
     */
    @ApiModelProperty({ description: 'Country', example: 'Malaysia' })
    @IsNotEmpty()
    @IsString()
    country: string;

    /**
     * Data personal detail - emergency contact
     *
     * @type {UserEmergencyContactDetailDTO}
     * @memberof PersonalDetailXML
     */
    @ApiModelProperty({ description: 'User emergency contact detail', type: UserEmergencyContactDetailDTO })
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
    @ApiModelProperty({ description: 'User education detail', type: UserEducationDetailDTO })
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
    @ApiModelProperty({ description: 'User certification detail', type: UserCertificationDetailDTO })
    @Type(() => UserCertificationDetailDTO)
    @ValidateNested()
    certification: UserCertificationDetailDTO;

    /**
     * Data personal detail - family
     *
     * @type {UserFamilyDTO}
     * @memberof PersonalDetailXML
     */
    @ApiModelProperty({ description: 'User family detail', type: UserFamilyDTO })
    @Type(() => UserFamilyDTO)
    @ValidateNested()
    family: UserFamilyDTO
}