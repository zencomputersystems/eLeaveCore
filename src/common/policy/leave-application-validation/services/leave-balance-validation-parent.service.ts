import { Injectable } from '@nestjs/common';
import { EntitledFullService } from '../../entitlement-type/services/leave-entitlement-type/entitledFull.service';
import { ProratedDateCurrentMonthService } from '../../entitlement-type/services/leave-entitlement-type/proratedDateCurrentMonth.service';
import { ProratedDateEndYearService } from '../../entitlement-type/services/leave-entitlement-type/proratedDateEndYear.service';
import { ServiceYearCalc } from '../../entitlement-type/services/service-year-calculation-service/serviceYearCalc.service';
import { UserInfoModel } from 'src/admin/user-info/model/user-info.model';
import { LeaveTypePropertiesXmlDTO } from 'src/admin/leavetype-entitlement/dto/xml/leavetype-properties.xml.dto';

/**
 * Service leave balance validation: get parent calculation
 *
 * @export
 * @class LeaveBalanceValidationParentService
 */
@Injectable()
export class LeaveBalanceValidationParentService {

  /**
   *Creates an instance of LeaveBalanceValidationParentService.
   * @param {EntitledFullService} entitledInFullService
   * @param {ProratedDateCurrentMonthService} proratedDateMonthService
   * @param {ProratedDateEndYearService} proratedDateEndYearService
   * @param {ServiceYearCalc} workingYearService
   * @memberof LeaveBalanceValidationParentService
   */
  constructor(
    private readonly entitledInFullService: EntitledFullService,
    private readonly proratedDateMonthService: ProratedDateCurrentMonthService,
    private readonly proratedDateEndYearService: ProratedDateEndYearService,
    private readonly workingYearService: ServiceYearCalc,
  ) { }

  /**
   * Get parent balance method
   *
   * @param {UserInfoModel} userInfo
   * @param {LeaveTypePropertiesXmlDTO} policy
   * @returns
   * @memberof LeaveBalanceValidationParentService
   */
  public getParentBalance(userInfo: UserInfoModel, policy: LeaveTypePropertiesXmlDTO) {
    // PARENT CALCULATION
    let parentBalance = 0;

    const serviceYear = this.workingYearService.calculateEmployeeServiceYear(new Date(userInfo.JOIN_DATE));

    switch (policy.leaveEntitlementType.toUpperCase()) {
      case ('Entitled in full').toUpperCase(): // Join month 6 get all entitled days in year
        parentBalance = this.entitledInFullService.calculateEntitledLeave(new Date(userInfo.JOIN_DATE), serviceYear, policy);
        break;
      case ('Prorated from date-of-confirm to current month').toUpperCase(): // Confirm month 6 pro rated to current month
        parentBalance = this.proratedDateMonthService.calculateEntitledLeave(new Date(userInfo.CONFIRMATION_DATE), serviceYear, policy);
        break;
      case ('Prorated from date-of-join to current month').toUpperCase(): // Join month 6 pro rated to current month
        parentBalance = this.proratedDateMonthService.calculateEntitledLeave(new Date(userInfo.JOIN_DATE), serviceYear, policy);
        break;
      case ('Prorated from date-of-confirm to end of year').toUpperCase(): // Confirm month 6 pro rated entitled in year
        parentBalance = this.proratedDateEndYearService.calculateEntitledLeave(new Date(userInfo.JOIN_DATE), serviceYear, policy);
        break;
      case ('Prorated from date-of-join to end of year').toUpperCase(): // Join month 6 pro rated entitled in year
        parentBalance = this.proratedDateEndYearService.calculateEntitledLeave(new Date(userInfo.CONFIRMATION_DATE), serviceYear, policy);
        break;
      default:
        break;
    }

    return parentBalance;
  }
}