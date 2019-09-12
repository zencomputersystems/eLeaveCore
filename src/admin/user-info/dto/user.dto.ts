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
    @ApiModelProperty({ description: 'Employee id', example: '3909' })
    @IsNotEmpty()
    employeeId: string;

    /**
     * Data user dto - employee name
     *
     * @type {string}
     * @memberof UserDto
     */
    @ApiModelProperty({ description: 'Employee Fullname', example: 'Nurul Hidayah Binti Romli' })
    @IsNotEmpty()
    employeeName: string;

    /**
     * Data user dto - phone number
     *
     * @type {string}
     * @memberof UserDto
     */
    @ApiModelProperty({ description: 'Employee phone number', example: '0126263545' })
    @IsNotEmpty()
    phoneNumber: string;

    /**
     * Data user dto - company number
     *
     * @type {string}
     * @memberof UserDto
     */
    @ApiModelProperty({ description: 'Employee company number', example: 'REG-001' })
    companyNumber: string;

    /**
     * Data user dto - marital status
     *
     * @type {number}
     * @memberof UserDto
     */
    @ApiModelProperty({ description: 'Employee marital status (0-single/1-married)', example: 1 })
    @IsNotEmpty()
    maritalStatus: number;

    /**
     * Data user dto - ic number
     *
     * @type {string}
     * @memberof UserDto
     */
    @ApiModelProperty({ description: 'Employee IC number', example: '920909-10-8883' })
    @IsNotEmpty()
    icNumber: string;

    /**
     * Data user dto - dob
     *
     * @type {Date}
     * @memberof UserDto
     */
    @ApiModelProperty({ description: 'Employee date of birth', example: '1992-09-09' })
    @IsNotEmpty()
    dob: Date;

    /**
     * Data user dto - gender
     *
     * @type {number}
     * @memberof UserDto
     */
    @ApiModelProperty({ description: 'Employee gender (0-female/1-male)', example: 1 })
    @IsNotEmpty()
    gender: number;

    /**
     * Data user dto - email
     *
     * @type {string}
     * @memberof UserDto
     */
    @ApiModelProperty({ description: 'Employee email', example: 'mastura@gmail.com' })
    @IsNotEmpty()
    email: string;

    /**
     * Residential address info
     *
     * @type {string}
     * @memberof UserDto
     */
    @ApiModelProperty({ description: 'Employee address', example: 'B-09-01, Apartment Jintan' })
    @IsNotEmpty()
    address1: string;

    /**
     * Residential address info 2
     *
     * @type {string}
     * @memberof UserDto
     */
    @ApiModelProperty({ description: 'Employee address 2', example: 'Jalan Jintan 2, Taman Jintan Manis' })
    address2: string;

    /**
     * Data user dto - city
     *
     * @type {string}
     * @memberof UserDto
     */
    @ApiModelProperty({ description: 'Employee city', example: 'Cyberjaya' })
    @IsNotEmpty()
    city: string;

    /**
     * Data user dto - postcode
     *
     * @type {string}
     * @memberof UserDto
     */
    @ApiModelProperty({ description: 'Employee postcode', example: '43650' })
    @IsNotEmpty()
    postcode: string;

    /**
     * Data user dto - state
     *
     * @type {string}
     * @memberof UserDto
     */
    @ApiModelProperty({ description: 'Employee state', example: 'Selangor' })
    @IsNotEmpty()
    state: string;

    /**
     * Data user dto - country
     *
     * @type {string}
     * @memberof UserDto
     */
    @ApiModelProperty({ description: 'Employee country', example: 'Malaysia' })
    @IsNotEmpty()
    country: string;

    /**
     * Family info
     *
     * @type {UserFamilyDTO[]}
     * @memberof UserDto
     */
    @ApiModelProperty({ description: 'Employee family details', type: UserFamilyDTO })
    @Type(() => UserFamilyDTO)
    @ValidateNested()
    family: UserFamilyDTO[];

    /**
     * Emergency contact details
     *
     * @type {UserEmergencyContactDetailDTO}
     * @memberof UserDto
     */
    @ApiModelProperty({ description: 'Employee emergency contact details', type: UserEmergencyContactDetailDTO })
    @Type(() => UserEmergencyContactDetailDTO)
    @ValidateNested()
    emergencyContacts: UserEmergencyContactDetailDTO;

    /**
     * Education info
     *
     * @type {UserEducationDetailDTO}
     * @memberof UserDto
     */
    @ApiModelProperty({ description: 'Employee educational details', type: UserEducationDetailDTO })
    @Type(() => UserEducationDetailDTO)
    @ValidateNested()
    education: UserEducationDetailDTO;

    /**
     * Professional certifications
     *
     * @type {UserCertificationDetailDTO}
     * @memberof UserDto
     */
    @ApiModelProperty({ description: 'Employee certification details', type: UserCertificationDetailDTO })
    @Type(() => UserCertificationDetailDTO)
    @ValidateNested()
    professionalCerts: UserCertificationDetailDTO

    /**
     * Employment info
     *
     * @type {UserEmployeeDTO}
     * @memberof UserDto
     */
    @ApiModelProperty({ description: 'Employee employment details', type: UserEmployeeDTO })
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