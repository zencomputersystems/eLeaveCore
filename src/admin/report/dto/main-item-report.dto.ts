import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

/**
 * Main item report dto
 *
 * @export
 * @class MainItemReportDto
 */
export class MainItemReportDto {

  /**
   * Department
   *
   * @type {string}
   * @memberof MainItemReportDto
   */
  @ApiModelProperty({ description: 'Department', example: 'RND' })
  @IsString()
  department: string;

  /**
   * Company name
   *
   * @type {string}
   * @memberof MainItemReportDto
   */
  @ApiModelProperty({ description: 'Company Name', example: 'Zen Computer System Sdn. Bhd.' })
  @IsString()
  companyName: string;

  /**
   * Branch
   *
   * @type {string}
   * @memberof MainItemReportDto
   */
  @ApiModelProperty({ description: 'Branch Name', example: 'Cyberjaya' })
  @IsString()
  branch: string;

  /**
   * Costcentre
   *
   * @type {string}
   * @memberof MainItemReportDto
   */
  @ApiModelProperty({ description: 'Costcentre Name', example: 'Management' })
  @IsString()
  costcentre: string;
}