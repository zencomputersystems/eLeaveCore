import { ApiModelProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * EmergencyContactDetailsDTO
 *
 * @export
 * @class EmergencyContactDetailsDTO
 */
export class EmergencyContactDetailsDTO {
  /**
   * Contact name
   *
   * @type {string}
   * @memberof EmergencyContactDetailsDTO
   */
  @ApiModelProperty({ description: 'Contact name', example: 'Raymond' })
  // @IsNotEmpty()
  @IsString()
  @IsOptional()
  contactName: string;

  /**
   * Contact number
   *
   * @type {string}
   * @memberof EmergencyContactDetailsDTO
   */
  @ApiModelProperty({ description: 'Contact number', example: '0197993312' })
  // @IsNotEmpty()
  @IsString()
  @IsOptional()
  contactNumber: string;

  /**
   * Relationship with contact person
   *
   * @type {string}
   * @memberof EmergencyContactDetailsDTO
   */
  @ApiModelProperty({ description: 'Contact relationship', example: 'Father' })
  // @IsNotEmpty()
  @IsString()
  @IsOptional()
  contactRelationship: string;
}

/**
 * EducationDetailsDTO
 *
 * @export
 * @class EducationDetailsDTO
 */
export class EducationDetailsDTO {
  /**
   * Qualification level
   *
   * @type {string}
   * @memberof EducationDetailsDTO
   */
  @ApiModelProperty({ description: 'Qualification Level', example: 'Bachelor Degree' })
  // @IsNotEmpty()
  @IsString()
  @IsOptional()
  qualificationLevel: string;

  /**
   * Major
   *
   * @type {string}
   * @memberof EducationDetailsDTO
   */
  @ApiModelProperty({ description: 'Major course', example: 'Software Engineering' })
  // @IsNotEmpty()
  @IsString()
  @IsOptional()
  major: string;

  /**
   * University
   *
   * @type {string}
   * @memberof EducationDetailsDTO
   */
  @ApiModelProperty({ description: 'University', example: 'Universiti Putra Malaysia' })
  // @IsNotEmpty()
  @IsString()
  @IsOptional()
  university: string;

  /**
   * Duration year study
   *
   * @type {string}
   * @memberof EducationDetailsDTO
   */
  @ApiModelProperty({ description: 'Year duration period', example: '2011-2015' })
  // @IsNotEmpty()
  @IsString()
  @IsOptional()
  year: string;
}

/**
 * CertificationDetailsDTO
 *
 * @export
 * @class CertificationDetailsDTO
 */
export class CertificationDetailsDTO {
  /**
   * Certification name
   *
   * @type {string}
   * @memberof CertificationDetailsDTO
   */
  @ApiModelProperty({ description: 'Certification name', example: 'Bachelor Degree In Computer Science' })
  // @IsNotEmpty()
  @IsString()
  @IsOptional()
  certificationName: string;

  /**
   * Certification enroll year
   *
   * @type {number}
   * @memberof CertificationDetailsDTO
   */
  @ApiModelProperty({ description: 'Certification enroll year', example: 2011 })
  // @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  certificationEnrollYear: number;

  /**
   * Certification graduated year
   *
   * @type {number}
   * @memberof CertificationDetailsDTO
   */
  @ApiModelProperty({ description: 'Certification graduate year', example: 2015 })
  // @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  certificationGraduateYear: number;

  /**
   * Certification attachment
   *
   * @type {string}
   * @memberof CertificationDetailsDTO
   */
  @ApiModelProperty({ description: 'Certification attachment', example: 'attachment1.png' })
  // @IsNotEmpty()
  @IsString()
  @IsOptional()
  certificationAttachment: string;
}

/**
 * SpouseDetailsDTO
 *
 * @export
 * @class SpouseDetailsDTO
 */
export class SpouseDetailsDTO {
  /**
   * Spouse name
   *
   * @type {string}
   * @memberof SpouseDetailsDTO
   */
  @ApiModelProperty({ description: 'Spouse name', example: 'Billy' })
  // @IsNotEmpty()
  @IsString()
  @IsOptional()
  spouseName: string;

  /**
   * Spouse IC number
   *
   * @type {string}
   * @memberof SpouseDetailsDTO
   */
  @ApiModelProperty({ description: 'Spouse NRIC', example: '900912102212' })
  // @IsNotEmpty()
  @IsString()
  @IsOptional()
  spouseIdentificationNumber: string;
}

/**
 * ChildDetailsDTO
 *
 * @export
 * @class ChildDetailsDTO
 */
export class ChildDetailsDTO {
  /**
   * Child name
   *
   * @type {string}
   * @memberof ChildDetailsDTO
   */
  @ApiModelProperty({ description: 'Child name', example: 'Akmal' })
  // @IsNotEmpty()
  @IsString()
  @IsOptional()
  childName: string;

  /**
   * Child IC number
   *
   * @type {string}
   * @memberof ChildDetailsDTO
   */
  @ApiModelProperty({ description: 'Child NRIC', example: '011012109814' })
  // @IsNotEmpty()
  @IsString()
  @IsOptional()
  childIdentificationNumber: string;
}

/**
 * FamilyDetailsDTO
 *
 * @export
 * @class FamilyDetailsDTO
 */
export class FamilyDetailsDTO {
  /**
   * Spouse
   *
   * @type {SpouseDetailsDTO[]}
   * @memberof FamilyDetailsDTO
   */
  @ApiModelProperty({ description: 'Certification attachment', type: [SpouseDetailsDTO] })
  @IsNotEmpty()
  spouse: SpouseDetailsDTO[];

  /**
   * Child
   *
   * @type {ChildDetailsDTO[]}
   * @memberof FamilyDetailsDTO
   */
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
  /**
   * Fullname
   *
   * @type {string}
   * @memberof PersonalDetailsDTO
   */
  @ApiModelProperty({ description: 'Full name', example: 'Nurul Hidayah Binti Romli' })
  @IsNotEmpty()
  @IsString()
  fullname: string;

  /**
   * Nickname
   *
   * @type {string}
   * @memberof PersonalDetailsDTO
   */
  @ApiModelProperty({ description: 'Nick name', example: 'Pratap' })
  // @IsNotEmpty()
  @IsString()
  @IsOptional()
  nickname: string;

  /**
   * IC number
   *
   * @type {string}
   * @memberof PersonalDetailsDTO
   */
  @ApiModelProperty({ description: 'NRIC', example: '9012121088135' })
  @IsNotEmpty()
  @IsString()
  nric: string;

  /**
   * Date of birth
   *
   * @type {string}
   * @memberof PersonalDetailsDTO
   */
  @ApiModelProperty({ description: 'Date of birth', example: '1990-08-16' })
  @IsNotEmpty()
  @IsString()
  dob: string;

  /**
   * Gender (0-FEMALE, 1-MALE)
   *
   * @type {string}
   * @memberof PersonalDetailsDTO
   */
  @ApiModelProperty({ description: 'Gender (Female/ Male)', example: 'Male' })
  // @IsNotEmpty()
  @IsString()
  @IsOptional()
  gender: string;

  /**
   * Marital status (0-SINGLE,1-MARRIED)
   *
   * @type {string}
   * @memberof PersonalDetailsDTO
   */
  @ApiModelProperty({ description: 'Marital status (0-SINGLE,1-MARRIED)', example: 'Single' })
  // @IsNotEmpty()
  @IsString()
  @IsOptional()
  maritalStatus: string;

  /**
   * Race
   *
   * @type {string}
   * @memberof PersonalDetailsDTO
   */
  @ApiModelProperty({ description: 'Race', example: 'Chinese' })
  // @IsNotEmpty()
  @IsString()
  @IsOptional()
  race: string;

  /**
   * Religion
   *
   * @type {string}
   * @memberof PersonalDetailsDTO
   */
  @ApiModelProperty({ description: 'Religion', example: 'Christian' })
  // @IsNotEmpty()
  @IsString()
  @IsOptional()
  religion: string;

  /**
   * Nationality
   *
   * @type {string}
   * @memberof PersonalDetailsDTO
   */
  @ApiModelProperty({ description: 'Nationality', example: 'Malaysian' })
  // @IsNotEmpty()
  @IsString()
  @IsOptional()
  nationality: string;

  /**
   * Phone number
   *
   * @type {string}
   * @memberof PersonalDetailsDTO
   */
  @ApiModelProperty({ description: 'Phone Number', example: '017-33314141' })
  @IsNotEmpty()
  @IsString()
  // @IsOptional()
  phoneNumber: string;

  /**
   * Company work phone number
   *
   * @type {string}
   * @memberof PersonalDetailsDTO
   */
  @ApiModelProperty({ description: 'Work Phone Number', example: '019-88831235' })
  @IsNotEmpty()
  @IsString()
  // @IsOptional()
  workPhoneNumber: string;

  /**
   * Personal email address
   *
   * @type {string}
   * @memberof PersonalDetailsDTO
   */
  @ApiModelProperty({ description: 'Email Address', example: 'pratap@gmail.com' })
  @IsNotEmpty()
  @IsString()
  emailAddress: string;

  /**
   * Work email address
   *
   * @type {string}
   * @memberof PersonalDetailsDTO
   */
  @ApiModelProperty({ description: 'Work email address', example: 'pratap@zen.com.my' })
  @IsNotEmpty()
  @IsString()
  workEmailAddress: string;

  /**
   * Address 1
   *
   * @type {string}
   * @memberof PersonalDetailsDTO
   */
  @ApiModelProperty({ description: 'Address 1', example: 'Unit No. C-6-4, Block C' })
  // @IsNotEmpty()
  @IsString()
  @IsOptional()
  address1: string;

  /**
   * Address 2
   *
   * @type {string}
   * @memberof PersonalDetailsDTO
   */
  @ApiModelProperty({ description: 'Address 2', example: 'Persiaran Ceria, Cyber 12' })
  // @IsNotEmpty()
  @IsString()
  @IsOptional()
  address2: string;

  /**
   * Postcode
   *
   * @type {number}
   * @memberof PersonalDetailsDTO
   */
  @ApiModelProperty({ description: 'Postcode', example: 63000 })
  // @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  postcode: number;

  /**
   * City
   *
   * @type {string}
   * @memberof PersonalDetailsDTO
   */
  @ApiModelProperty({ description: 'City', example: 'Cyberjaya' })
  // @IsNotEmpty()
  @IsString()
  @IsOptional()
  city: string;

  /**
   * State
   *
   * @type {string}
   * @memberof PersonalDetailsDTO
   */
  @ApiModelProperty({ description: 'State', example: 'Selangor' })
  // @IsNotEmpty()
  @IsString()
  @IsOptional()
  state: string;

  /**
   * Country
   *
   * @type {string}
   * @memberof PersonalDetailsDTO
   */
  @ApiModelProperty({ description: 'Country', example: 'Malaysia' })
  // @IsNotEmpty()
  @IsString()
  @IsOptional()
  country: string;

  /**
   * Emergency contact
   *
   * @type {EmergencyContactDetailsDTO[]}
   * @memberof PersonalDetailsDTO
   */
  @ApiModelProperty({ description: 'Emergency contact details', type: [EmergencyContactDetailsDTO] })
  @IsNotEmpty()
  @Type(() => EmergencyContactDetailsDTO)
  emergencyContact: EmergencyContactDetailsDTO[];

  /**
   * Education
   *
   * @type {EducationDetailsDTO[]}
   * @memberof PersonalDetailsDTO
   */
  @ApiModelProperty({ description: 'Education details', type: [EducationDetailsDTO] })
  @IsNotEmpty()
  @Type(() => EducationDetailsDTO)
  education: EducationDetailsDTO[];

  /**
   * Certification
   *
   * @type {CertificationDetailsDTO[]}
   * @memberof PersonalDetailsDTO
   */
  @ApiModelProperty({ description: 'Certification details', type: [CertificationDetailsDTO] })
  @IsNotEmpty()
  @Type(() => CertificationDetailsDTO)
  certification: CertificationDetailsDTO[];

  /**
   * Family data
   *
   * @type {FamilyDetailsDTO}
   * @memberof PersonalDetailsDTO
   */
  @ApiModelProperty({ description: 'Family details', type: FamilyDetailsDTO })
  @IsNotEmpty()
  @Type(() => FamilyDetailsDTO)
  family: FamilyDetailsDTO;

}
