import { ApiModelProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * EmergencyContactDetailsDTO
 *
 * @export
 * @class EmergencyContactDetailsDTO
 */
export class EmergencyContactDetailsDTO {
  @ApiModelProperty({ description: 'Contact name', example: 'Raymond' })
  @IsNotEmpty()
  @IsString()
  contactName: string;

  @ApiModelProperty({ description: 'Contact number', example: '0197993312' })
  @IsNotEmpty()
  @IsString()
  contactNumber: string;

  @ApiModelProperty({ description: 'Contact relationship', example: 'Father' })
  @IsNotEmpty()
  @IsString()
  contactRelationship: string;
}

/**
 * EducationDetailsDTO
 *
 * @export
 * @class EducationDetailsDTO
 */
export class EducationDetailsDTO {
  @ApiModelProperty({ description: 'Qualification Level', example: 'Bachelor Degree' })
  @IsNotEmpty()
  @IsString()
  qualificationLevel: string;

  @ApiModelProperty({ description: 'Major course', example: 'Software Engineering' })
  @IsNotEmpty()
  @IsString()
  major: string;

  @ApiModelProperty({ description: 'University', example: 'Universiti Putra Malaysia' })
  @IsNotEmpty()
  @IsString()
  university: string;

  @ApiModelProperty({ description: 'Year duration period', example: '2011-2015' })
  @IsNotEmpty()
  @IsString()
  year: string;
}

/**
 * CertificationDetailsDTO
 *
 * @export
 * @class CertificationDetailsDTO
 */
export class CertificationDetailsDTO {
  @ApiModelProperty({ description: 'Certification name', example: 'Bachelor Degree In Computer Science' })
  @IsNotEmpty()
  @IsString()
  certificationName: string;

  @ApiModelProperty({ description: 'Certification enroll year', example: 2011 })
  @IsNotEmpty()
  @IsNumber()
  certificationEnrollYear: number;

  @ApiModelProperty({ description: 'Certification graduate year', example: 2015 })
  @IsNotEmpty()
  @IsNumber()
  certificationGraduateYear: number;

  @ApiModelProperty({ description: 'Certification attachment', example: 'attachment1.png' })
  @IsNotEmpty()
  @IsString()
  certificationAttachment: string;
}

/**
 * SpouseDetailsDTO
 *
 * @export
 * @class SpouseDetailsDTO
 */
export class SpouseDetailsDTO {
  @ApiModelProperty({ description: 'Spouse name', example: 'Billy' })
  @IsNotEmpty()
  @IsString()
  spouseName: string;

  @ApiModelProperty({ description: 'Spouse NRIC', example: '900912102212' })
  @IsNotEmpty()
  @IsString()
  spouseIdentificationNumber: string;
}

/**
 * ChildDetailsDTO
 *
 * @export
 * @class ChildDetailsDTO
 */
export class ChildDetailsDTO {
  @ApiModelProperty({ description: 'Child name', example: 'Akmal' })
  @IsNotEmpty()
  @IsString()
  childName: string;

  @ApiModelProperty({ description: 'Child NRIC', example: '011012109814' })
  @IsNotEmpty()
  @IsString()
  childIdentificationNumber: string;
}

/**
 * FamilyDetailsDTO
 *
 * @export
 * @class FamilyDetailsDTO
 */
export class FamilyDetailsDTO {
  @ApiModelProperty({ description: 'Certification attachment', type: [SpouseDetailsDTO] })
  @IsNotEmpty()
  spouse: SpouseDetailsDTO[];

  @ApiModelProperty({ description: 'Certification attachment', type: [ChildDetailsDTO] })
  @IsNotEmpty()
  child: ChildDetailsDTO[];
}



/**
 * PersonalDetailsDTO
 *
 * @export
 * @class PersonalDetailsDTO
 */
export class PersonalDetailsDTO {
  @ApiModelProperty({ description: 'Full name', example: 'Nurul Hidayah Binti Romli' })
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @ApiModelProperty({ description: 'Nick name', example: 'Pratap' })
  @IsNotEmpty()
  @IsString()
  nickname: string;

  @ApiModelProperty({ description: 'NRIC', example: '9012121088135' })
  @IsNotEmpty()
  @IsString()
  nric: string;

  @ApiModelProperty({ description: 'Date of birth', example: '1990-08-16' })
  @IsNotEmpty()
  @IsString()
  dob: string;

  @ApiModelProperty({ description: 'Gender (0-FEMALE, 1-MALE)', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  gender: number;

  @ApiModelProperty({ description: 'Marital status (0-SINGLE,1-MARRIED)', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  maritalStatus: number;

  @ApiModelProperty({ description: 'Race', example: 'Chinese' })
  @IsNotEmpty()
  @IsString()
  race: string;

  @ApiModelProperty({ description: 'Religion', example: 'Christian' })
  @IsNotEmpty()
  @IsString()
  religion: string;

  @ApiModelProperty({ description: 'Nationality', example: 'Malaysian' })
  @IsNotEmpty()
  @IsString()
  nationality: string;

  @ApiModelProperty({ description: 'Phone Number', example: '017-33314141' })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ApiModelProperty({ description: 'Work Phone Number', example: '019-88831235' })
  @IsNotEmpty()
  @IsString()
  workPhoneNumber: string;

  @ApiModelProperty({ description: 'Email Address', example: 'pratap@gmail.com' })
  @IsNotEmpty()
  @IsString()
  emailAddress: string;

  @ApiModelProperty({ description: 'Work email address', example: 'pratap@zen.com.my' })
  @IsNotEmpty()
  @IsString()
  workEmailAddress: string;

  @ApiModelProperty({ description: 'Address 1', example: 'Unit No. C-6-4, Block C' })
  @IsNotEmpty()
  @IsString()
  address1: string;

  @ApiModelProperty({ description: 'Address 2', example: 'Persiaran Ceria, Cyber 12' })
  @IsNotEmpty()
  @IsString()
  address2: string;

  @ApiModelProperty({ description: 'Postcode', example: 63000 })
  @IsNotEmpty()
  @IsNumber()
  postcode: number;

  @ApiModelProperty({ description: 'City', example: 'Cyberjaya' })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiModelProperty({ description: 'State', example: 'Selangor' })
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiModelProperty({ description: 'Country', example: 'Malaysia' })
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiModelProperty({ description: 'Emergency contact details', type: [EmergencyContactDetailsDTO] })
  @IsNotEmpty()
  @Type(() => EmergencyContactDetailsDTO)
  emergencyContact: EmergencyContactDetailsDTO[];

  @ApiModelProperty({ description: 'Education details', type: [EducationDetailsDTO] })
  @IsNotEmpty()
  @Type(() => EducationDetailsDTO)
  education: EducationDetailsDTO[];

  @ApiModelProperty({ description: 'Certification details', type: [CertificationDetailsDTO] })
  @IsNotEmpty()
  @Type(() => CertificationDetailsDTO)
  certification: CertificationDetailsDTO[];

  @ApiModelProperty({ description: 'Family details', type: FamilyDetailsDTO })
  @IsNotEmpty()
  @Type(() => FamilyDetailsDTO)
  family: FamilyDetailsDTO;

}
