import { UserEmployeeDTO } from './user-employee.dto';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UserEducationDetailDTO } from 'src/api/userprofile/dto/userprofile-detail/personal-detail/xml/user-education-detail.dto';
import { UserCertificationDetailDTO } from './user-certification-detail.dto';
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

    @ApiModelProperty()
    @IsNotEmpty()
    employeeId: string;

    @ApiModelProperty()
    @IsNotEmpty()
    employeeName: string;

    @ApiModelProperty()
    @IsNotEmpty()
    phoneNumber: string;

    @ApiModelProperty()
    companyNumber: string;

    @ApiModelProperty()
    @IsNotEmpty()
    maritalStatus: number;

    @ApiModelProperty()
    @IsNotEmpty()
    icNumber: string;

    @ApiModelProperty()
    @IsNotEmpty()
    dob: Date;

    @ApiModelProperty()
    @IsNotEmpty()
    gender: number;

    @ApiModelProperty()
    @IsNotEmpty()
    email: string;

    // residential address info
    @ApiModelProperty()
    @IsNotEmpty()
    address1: string;

    @ApiModelProperty()
    address2: string;

    @ApiModelProperty()
    @IsNotEmpty()
    city: string;

    @ApiModelProperty()
    @IsNotEmpty()
    postcode: string;

    @ApiModelProperty()
    @IsNotEmpty()
    state: string;

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

}