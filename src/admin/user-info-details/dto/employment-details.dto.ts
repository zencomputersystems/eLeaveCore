import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class EmploymentDetailsDTO {
  @ApiModelProperty({ description: 'Staff id', example: '3909' })
  @IsNotEmpty()
  @IsString()
  employeeId: string;

  @ApiModelProperty({ description: 'Company id', example: '323bdfa7-eed2-8bf2-2274-b1cd9390c9ca' })
  @IsNotEmpty()
  @IsString()
  companyId: string;

  @ApiModelProperty({ description: 'Email for work', example: 'example@zen.com.my' })
  @IsNotEmpty()
  @IsString()
  workEmailAddress: string;

  @ApiModelProperty({ description: 'Department', example: 'Research and Development' })
  @IsNotEmpty()
  @IsString()
  department: string;

  @ApiModelProperty({ description: 'Designation', example: 'Service Desk Consultant' })
  @IsNotEmpty()
  @IsString()
  designation: string;

  @ApiModelProperty({ description: 'Section', example: 'Management' })
  @IsNotEmpty()
  @IsString()
  section: string;

  @ApiModelProperty({ description: 'Branch', example: 'Cyberjaya' })
  @IsNotEmpty()
  @IsString()
  branch: string;

  @ApiModelProperty({ description: 'Costcentre', example: 'Service' })
  @IsNotEmpty()
  @IsString()
  costcentre: string;

  @ApiModelProperty({ description: 'Employment status', example: 'Confirmed' })
  @IsNotEmpty()
  @IsString()
  employmentStatus: string;

  @ApiModelProperty({ description: 'Employment Type', example: 'Permanent' })
  @IsNotEmpty()
  @IsString()
  employmentType: string;

  @ApiModelProperty({ description: 'Manager user guid', example: 'b022d1b1-ff12-9cdf-2272-8c01cb75fbe0' })
  @IsNotEmpty()
  @IsString()
  reportingTo: string;

  @ApiModelProperty({ description: 'User role', example: 'Employee' })
  @IsNotEmpty()
  @IsString()
  userRole: string;

  @ApiModelProperty({ description: 'Date of join', example: '2019-09-09' })
  @IsNotEmpty()
  @IsString()
  dateOfJoin: string;

  @ApiModelProperty({ description: 'Date of confirmation', example: '2019-10-09' })
  @IsNotEmpty()
  @IsString()
  dateOfConfirmation: string;

  @ApiModelProperty({ description: 'Date of resign', example: '2019-12-09' })
  @IsString()
  dateOfResign: string;

  @ApiModelProperty({ description: 'EPF Number', example: 'TY279FY' })
  @IsNotEmpty()
  @IsString()
  epfNumber: string;

  @ApiModelProperty({ description: 'Income tax number', example: '22170145' })
  @IsNotEmpty()
  @IsString()
  incomeTaxNumber: string;

  @ApiModelProperty({ description: 'Bank account name', example: 'Cimb Bank Berhad' })
  @IsNotEmpty()
  @IsString()
  bankAccountName: string;

  @ApiModelProperty({ description: 'Bank account number', example: '7071516435' })
  @IsNotEmpty()
  @IsString()
  bankAccountNumber: string;
}