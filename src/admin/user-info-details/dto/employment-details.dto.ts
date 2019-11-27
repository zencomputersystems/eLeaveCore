import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

/**
 * Data employment details
 *
 * @export
 * @class EmploymentDetailsDTO
 */
export class EmploymentDetailsDTO {
  /**
   * Empliyee id
   *
   * @type {string}
   * @memberof EmploymentDetailsDTO
   */
  @ApiModelProperty({ description: 'Staff id', example: '3909' })
  @IsNotEmpty()
  @IsString()
  employeeId: string;

  /**
   * Company id
   *
   * @type {string}
   * @memberof EmploymentDetailsDTO
   */
  @ApiModelProperty({ description: 'Company id', example: '323bdfa7-eed2-8bf2-2274-b1cd9390c9ca' })
  @IsNotEmpty()
  @IsString()
  companyId: string;

  /**
   * Work email address
   *
   * @type {string}
   * @memberof EmploymentDetailsDTO
   */
  @ApiModelProperty({ description: 'Email for work', example: 'example@zen.com.my' })
  @IsNotEmpty()
  @IsString()
  workEmailAddress: string;

  /**
   * Department
   *
   * @type {string}
   * @memberof EmploymentDetailsDTO
   */
  @ApiModelProperty({ description: 'Department', example: 'Research and Development' })
  @IsNotEmpty()
  @IsString()
  department: string;

  /**
   * Designation
   *
   * @type {string}
   * @memberof EmploymentDetailsDTO
   */
  @ApiModelProperty({ description: 'Designation', example: 'Service Desk Consultant' })
  @IsNotEmpty()
  @IsString()
  designation: string;

  /**
   * Section
   *
   * @type {string}
   * @memberof EmploymentDetailsDTO
   */
  @ApiModelProperty({ description: 'Section', example: 'Management' })
  @IsNotEmpty()
  @IsString()
  section: string;

  /**
   * Branch
   *
   * @type {string}
   * @memberof EmploymentDetailsDTO
   */
  @ApiModelProperty({ description: 'Branch', example: 'Cyberjaya' })
  @IsNotEmpty()
  @IsString()
  branch: string;

  /**
   * Costcentre
   *
   * @type {string}
   * @memberof EmploymentDetailsDTO
   */
  @ApiModelProperty({ description: 'Costcentre', example: 'Service' })
  @IsNotEmpty()
  @IsString()
  costcentre: string;

  /**
   * Employment status
   *
   * @type {string}
   * @memberof EmploymentDetailsDTO
   */
  @ApiModelProperty({ description: 'Employment status', example: 'Confirmed' })
  @IsNotEmpty()
  @IsString()
  employmentStatus: string;

  /**
   * Employee type
   *
   * @type {string}
   * @memberof EmploymentDetailsDTO
   */
  @ApiModelProperty({ description: 'Employment Type', example: 'Permanent' })
  @IsNotEmpty()
  @IsString()
  employmentType: string;

  /**
   * Reporting to
   *
   * @type {string}
   * @memberof EmploymentDetailsDTO
   */
  @ApiModelProperty({ description: 'Manager user guid', example: 'b022d1b1-ff12-9cdf-2272-8c01cb75fbe0' })
  @IsNotEmpty()
  @IsString()
  reportingTo: string;

  /**
   * User role
   *
   * @type {string}
   * @memberof EmploymentDetailsDTO
   */
  @ApiModelProperty({ description: 'User role', example: 'Employee' })
  @IsNotEmpty()
  @IsString()
  userRole: string;

  /**
   * Date of join
   *
   * @type {string}
   * @memberof EmploymentDetailsDTO
   */
  @ApiModelProperty({ description: 'Date of join', example: '2019-09-09' })
  @IsNotEmpty()
  @IsString()
  dateOfJoin: string;

  /**
   * Date of confirmation
   *
   * @type {string}
   * @memberof EmploymentDetailsDTO
   */
  @ApiModelProperty({ description: 'Date of confirmation', example: '2019-10-09' })
  @IsNotEmpty()
  @IsString()
  dateOfConfirmation: string;

  /**
   * Date of resign
   *
   * @type {string}
   * @memberof EmploymentDetailsDTO
   */
  @ApiModelProperty({ description: 'Date of resign', example: '2019-12-09' })
  @IsString()
  dateOfResign: string;

  /**
   * EPF number
   *
   * @type {string}
   * @memberof EmploymentDetailsDTO
   */
  @ApiModelProperty({ description: 'EPF Number', example: 'TY279FY' })
  @IsNotEmpty()
  @IsString()
  epfNumber: string;

  /**
   * Income tax number
   *
   * @type {string}
   * @memberof EmploymentDetailsDTO
   */
  @ApiModelProperty({ description: 'Income tax number', example: '22170145' })
  @IsNotEmpty()
  @IsString()
  incomeTaxNumber: string;

  /**
   * Bank account name
   *
   * @type {string}
   * @memberof EmploymentDetailsDTO
   */
  @ApiModelProperty({ description: 'Bank account name', example: 'Cimb Bank Berhad' })
  @IsNotEmpty()
  @IsString()
  bankAccountName: string;

  /**
   * Bank account number
   *
   * @type {string}
   * @memberof EmploymentDetailsDTO
   */
  @ApiModelProperty({ description: 'Bank account number', example: '7071516435' })
  @IsNotEmpty()
  @IsString()
  bankAccountNumber: string;
}