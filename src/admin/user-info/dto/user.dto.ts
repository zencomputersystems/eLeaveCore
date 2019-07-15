import { UserEmployeeDTO } from './user-employee.dto';
import { IsNotEmpty, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { UserEducationDetailDTO } from 'src/api/userprofile/dto/userprofile-detail/personal-detail/xml/user-education-detail.dto';
import { UserCertificationDetailDTO } from 'src/api/userprofile/dto/userprofile-detail/employment-detail/xml/user-certification-detail.dto';
import { UserEmergencyContactDetailDTO } from './user-emergency-contact-detail.dto';
import { ApiModelProperty } from '@nestjs/swagger';
import { UserFamilyDTO } from 'src/api/userprofile/dto/userprofile-detail/personal-detail/xml/user-family.dto';

/**
 * User DTO
 *
 * @export
 * @class UserDto
 */
export class UserDto {

    /**
     * Data user dto - employee id
     *
     * @type {string}
     * @memberof UserDto
     */
    @ApiModelProperty()
    @IsNotEmpty()
    employeeId: string;

    /**
     * Data user dto - employee name
     *
     * @type {string}
     * @memberof UserDto
     */
    @ApiModelProperty()
    @IsNotEmpty()
    employeeName: string;

    /**
     * Data user dto - phone number
     *
     * @type {string}
     * @memberof UserDto
     */
    @ApiModelProperty()
    @IsNotEmpty()
    phoneNumber: string;

    /**
     * Data user dto - company number
     *
     * @type {string}
     * @memberof UserDto
     */
    @ApiModelProperty()
    companyNumber: string;

    /**
     * Data user dto - marital status
     *
     * @type {number}
     * @memberof UserDto
     */
    @ApiModelProperty()
    @IsNotEmpty()
    maritalStatus: number;

    /**
     * Data user dto - ic number
     *
     * @type {string}
     * @memberof UserDto
     */
    @ApiModelProperty()
    @IsNotEmpty()
    icNumber: string;

    /**
     * Data user dto - dob
     *
     * @type {Date}
     * @memberof UserDto
     */
    @ApiModelProperty()
    @IsNotEmpty()
    dob: Date;

    /**
     * Data user dto - gender
     *
     * @type {number}
     * @memberof UserDto
     */
    @ApiModelProperty()
    @IsNotEmpty()
    gender: number;

    /**
     * Data user dto - email
     *
     * @type {string}
     * @memberof UserDto
     */
    @ApiModelProperty()
    @IsNotEmpty()
    email: string;

    /**
     * Residential address info
     *
     * @type {string}
     * @memberof UserDto
     */
    @ApiModelProperty()
    @IsNotEmpty()
    address1: string;

    /**
     * Residential address info 2
     *
     * @type {string}
     * @memberof UserDto
     */
    @ApiModelProperty()
    address2: string;

    /**
     * Data user dto - city
     *
     * @type {string}
     * @memberof UserDto
     */
    @ApiModelProperty()
    @IsNotEmpty()
    city: string;

    /**
     * Data user dto - postcode
     *
     * @type {string}
     * @memberof UserDto
     */
    @ApiModelProperty()
    @IsNotEmpty()
    postcode: string;

    /**
     * Data user dto - state
     *
     * @type {string}
     * @memberof UserDto
     */
    @ApiModelProperty()
    @IsNotEmpty()
    state: string;

    /**
     * Data user dto - country
     *
     * @type {string}
     * @memberof UserDto
     */
    @ApiModelProperty()
    @IsNotEmpty()
    country: string;

    /**
     * Family info
     *
     * @type {UserFamilyDTO[]}
     * @memberof UserDto
     */
    @ApiModelProperty()
    @Type(() => UserFamilyDTO)
    @ValidateNested()
    family: UserFamilyDTO[];

    /**
     * Emergency contact details
     *
     * @type {UserEmergencyContactDetailDTO}
     * @memberof UserDto
     */
    @ApiModelProperty()
    @Type(() => UserEmergencyContactDetailDTO)
    @ValidateNested()
    emergencyContacts: UserEmergencyContactDetailDTO;

    /**
     * Education info
     *
     * @type {UserEducationDetailDTO}
     * @memberof UserDto
     */
    @ApiModelProperty()
    @Type(() => UserEducationDetailDTO)
    @ValidateNested()
    education: UserEducationDetailDTO;

    /**
     * Professional certifications
     *
     * @type {UserCertificationDetailDTO}
     * @memberof UserDto
     */
    @ApiModelProperty()
    @Type(() => UserCertificationDetailDTO)
    @ValidateNested()
    professionalCerts: UserCertificationDetailDTO

    /**
     * Employment info
     *
     * @type {UserEmployeeDTO}
     * @memberof UserDto
     */
    @ApiModelProperty()
    @IsNotEmpty()
    @Type(() => UserEmployeeDTO)
    @ValidateNested()
    employmentDetail: UserEmployeeDTO;

    /**
     * Notification rule
     *
     * @type {string[]}
     * @memberof UserDto
     */
    @ApiModelProperty({ description: 'Person guid to notify', example: '["bf1172cd-d950-343b-e3f2-60ebeb8afcf4","D6B84686-DF26-48BA-9EC7-086ABEFEA74A"]' })
    @IsArray()
    @IsNotEmpty()
    notificationRule: string[];
}