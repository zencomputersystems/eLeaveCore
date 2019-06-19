import { IsNotEmpty, IsNumber, IsString, ValidateNested, IsISO8601 } from 'class-validator';
import { Type } from 'class-transformer';
import { UserEmergencyContactDetailDTO } from './user-emergency-contact-detail.dto';
import { UserEducationDetailDTO } from './user-education-detail.dto';
import { UserFamilyDTO } from './user-family.dto';
import { UserCertificationDetailDTO } from '../../employment-detail/xml/user-certification-detail.dto';
import { ApiModelProperty } from '@nestjs/swagger';
import { type } from 'os';


/**
 *
 *
 * @export
 * @class PersonalDetailXML
 */
export class PersonalDetailXML {
    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    id: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    nickname: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    nric: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsISO8601()
    dob: Date;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsNumber()
    gender: number;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsNumber()
    maritalStatus: number;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    race: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    religion: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    nationality: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    phoneNumber: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    workPhoneNumber: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    emailAddress: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    workEmailAddress: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    address1: string;

    @ApiModelProperty()
    @IsString()
    address2: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    postcode: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    city: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    state: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    country: string;

    @ApiModelProperty({ type: UserEmergencyContactDetailDTO })
    @Type(() => UserEmergencyContactDetailDTO)
    @ValidateNested()
    @IsNotEmpty()
    emergencyContact: UserEmergencyContactDetailDTO;

    @ApiModelProperty({ type: UserEducationDetailDTO })
    // education info
    @Type(() => UserEducationDetailDTO)
    @ValidateNested()
    education: UserEducationDetailDTO;

    @ApiModelProperty({ type: UserCertificationDetailDTO })
    @Type(() => UserCertificationDetailDTO)
    @ValidateNested()
    certification: UserCertificationDetailDTO;

    @ApiModelProperty({ type: UserFamilyDTO })
    @Type(() => UserFamilyDTO)
    @ValidateNested()
    family: UserFamilyDTO
}