import { UserEmergencyContactDetailDTO } from './xml/user-emergency-contact-detail.dto';
import { UserEducationDetailDTO } from './xml/user-education-detail.dto';
import { UserFamilyDTO } from './xml/user-family.dto';
import { IsNotEmpty, IsISO8601 } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 *
 *
 * @export
 * @class UserPersonalDetailDTO
 */
export class UserPersonalDetailDTO {

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

    @ApiModelProperty()
    @IsNotEmpty()
    nric: string;

    @ApiModelProperty()
    @IsNotEmpty()
    nickname: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsISO8601()
    dob: Date;

    @ApiModelProperty()
    @IsNotEmpty()
    gender: string;

    @ApiModelProperty()
    @IsNotEmpty()
    maritalStatus: string;

    @ApiModelProperty()
    @IsNotEmpty()
    race: string;

    @ApiModelProperty()
    @IsNotEmpty()
    religion: string;

    @ApiModelProperty()
    @IsNotEmpty()
    nationality: string;

    @ApiModelProperty()
    @IsNotEmpty()
    phoneNumber: string;

    @ApiModelProperty()
    workPhoneNumber: string;

    @ApiModelProperty()
    @IsNotEmpty()
    emailAddress: string;

    @ApiModelProperty()
    @IsNotEmpty()
    workEmailAddress: string;

    @ApiModelProperty()
    @IsNotEmpty()
    residentialAddress1: string;

    @ApiModelProperty()
    residentialAddress2: string;

    @ApiModelProperty()
    @IsNotEmpty()
    city: string;

    @ApiModelProperty()
    @IsNotEmpty()
    state: string;

    @ApiModelProperty()
    @IsNotEmpty()
    country: string;

    @ApiModelProperty()
    @IsNotEmpty()
    postcode: string;

    @ApiModelProperty({ type: UserEmergencyContactDetailDTO })
    emergencyContactNumber: UserEmergencyContactDetailDTO;

    @ApiModelProperty({ type: UserEducationDetailDTO })
    education: UserEducationDetailDTO;

    @ApiModelProperty({ type: UserFamilyDTO })
    family: UserFamilyDTO;
}