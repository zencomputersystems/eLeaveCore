import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean, IsNotEmpty } from 'class-validator';
import { ApprovalConfirmationXML } from './approval-confirmation-xml.dto';
import { AllowYearEndClosing } from './year-end-closing-xml.dto';
import { ForfeitCFLeave } from './forfeit-carry-forward-xml.dto';
import { Type } from 'class-transformer';

/**
 * Anniversary bonus dto
 *
 * @export
 * @class AnniversaryBonusDTO
 */
export class AnniversaryBonusDTO {
  /**
   * Value is allow or not
   *
   * @type {boolean}
   * @memberof AnniversaryBonusDTO
   */
  @ApiModelProperty({ description: 'Allow anniversary leave or not', example: true })
  @IsBoolean()
  allowAutoApplyLeave: boolean;

  /**
   * Auto apply anniversary on date
   *
   * @type {string}
   * @memberof AnniversaryBonusDTO
   */
  @ApiModelProperty({ description: 'Auto apply anniversary leave on', enum: ['birthday', 'join-date'] })
  @IsString()
  applyLeaveOnDate: string;

}

/**
 * XML data for general leave policy
 *
 * @export
 * @class GeneralLeavePolicyXML
 */
export class GeneralLeavePolicyXMLDTO {
  /**
   * approval confirmation
   *
   * @type {ApprovalConfirmationXML}
   * @memberof GeneralLeavePolicyXML
   */
  @ApiModelProperty({ description: 'approval confirmation', type: ApprovalConfirmationXML })
  @IsNotEmpty()
  @Type(() => ApprovalConfirmationXML)
  approvalConfirmation: ApprovalConfirmationXML;

  /**
   * forfeit carry forward leave on this day
   *
   * @type {ForfeitCFLeave}
   * @memberof GeneralLeavePolicyXML
   */
  @ApiModelProperty({ description: 'forfeit carry forward leave on this day', type: ForfeitCFLeave })
  @IsNotEmpty()
  @Type(() => ForfeitCFLeave)
  forfeitCFLeave: ForfeitCFLeave;

  /**
   * allow year end closing
   *
   * @type {AllowYearEndClosing}
   * @memberof GeneralLeavePolicyXML
   */
  @ApiModelProperty({ description: 'allow year end closing', type: AllowYearEndClosing })
  @IsNotEmpty()
  @Type(() => AllowYearEndClosing)
  allowYearEndClosing: AllowYearEndClosing;

  /**
   * apply on behalf comfirmation
   *
   * @type {boolean}
   * @memberof GeneralLeavePolicyXML
   */
  @ApiModelProperty({ description: 'apply on behalf comfirmation', example: false })
  @IsBoolean()
  applyOnBehalfConfirmation: boolean;

  /**
   * allow email reminder features
   *
   * @type {boolean}
   * @memberof GeneralLeavePolicyXML
   */
  @ApiModelProperty({ description: 'allow email reminder features', example: false })
  @IsBoolean()
  emailReminder: boolean;

  /**
   * Anniversary bonus setup
   *
   * @type {AnniversaryBonusDTO}
   * @memberof GeneralLeavePolicyXMLDTO
   */
  @ApiModelProperty({ description: 'Anniversary leave setup', type: AnniversaryBonusDTO })
  @IsNotEmpty()
  @Type(() => AnniversaryBonusDTO)
  anniversaryBonus: AnniversaryBonusDTO
}


