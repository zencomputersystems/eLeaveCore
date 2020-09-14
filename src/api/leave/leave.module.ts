import { Module, HttpModule } from '@nestjs/common';
import { ApplyController } from './controller/apply/apply.controller';
import { ApplyLeaveService } from './service/apply-leave.service';
import { UserLeaveEntitlementDbService } from '../userprofile/db/user-leave-entitlement.db.service';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { DreamFactory } from 'src/config/dreamfactory';
import { LeaveApplicationValidationService } from 'src/common/policy/leave-application-validation/services/leave-application-validation.service';
import { UserInfoService } from 'src/admin/user-info/user-info.service';
import { DateCalculationService } from 'src/common/calculation/service/date-calculation.service';
import { LeaveBalanceValidationService } from 'src/common/policy/leave-application-validation/services/leave-balance-validation.service';
import { EntitledFullService } from 'src/common/policy/entitlement-type/services/leave-entitlement-type/entitledFull.service';
import { ProratedDateCurrentMonthService } from 'src/common/policy/entitlement-type/services/leave-entitlement-type/proratedDateCurrentMonth.service';
import { ProratedDateEndYearService } from 'src/common/policy/entitlement-type/services/leave-entitlement-type/proratedDateEndYear.service';
import { ServiceYearCalc } from 'src/common/policy/entitlement-type/services/service-year-calculation-service/serviceYearCalc.service';
import { EntitlementRoundingService } from 'src/common/policy/entitlement-rounding/services/entitlement-rounding.service';
import { LeaveTransactionDbService } from './db/leave-transaction.db.service';
import { ApprovedController } from './controller/approval/approval.controller';
import { ApprovalService } from 'src/common/approval/service/approval.service';
import { AccessLevelValidateService } from 'src/common/helper/access-level-validate.service';
import { CommonFunctionService } from '../../common/helper/common-function.services';
import { LeaveBalanceValidationParentService } from 'src/common/policy/leave-application-validation/services/leave-balance-validation-parent.service';
import { getModuleHttp } from '../../common/helper/basic-functions';
import { GeneralLeavePolicyService } from '../../admin/general-leave-policy/general-leave-policy.service';
import { UserprofileDbService } from '../userprofile/db/userprofile.db.service';
import { LeaveTransactionLogDbService } from './db/leave-transaction-log.db.service';
import { LeavetypeEntitlementDbService } from 'src/admin/leavetype-entitlement/db/leavetype-entitlement.db.service';
import { CalendarProfileDbService } from '../../admin/holiday/db/calendar-profile-db.service';

/**
 * Module for leave
 *
 * @export
 * @class LeaveModule
 */
@Module({
  imports: [
    // HttpModule.register({ headers: { 'Content-Type': 'application/json', 'X-Dreamfactory-API-Key': DreamFactory.df_key } }),
    getModuleHttp()
  ],
  controllers: [ApplyController, ApprovedController],
  providers: [
    ApplyLeaveService,
    QueryParserService,
    UserLeaveEntitlementDbService,
    LeaveApplicationValidationService,
    LeaveTransactionDbService,
    UserInfoService,
    DateCalculationService,
    LeaveBalanceValidationService,
    EntitledFullService,
    ProratedDateCurrentMonthService,
    ProratedDateEndYearService,
    ServiceYearCalc,
    EntitlementRoundingService,
    ApprovalService,
    AccessLevelValidateService,
    CommonFunctionService,
    LeaveBalanceValidationParentService,
    GeneralLeavePolicyService,
    UserprofileDbService,
    LeaveTransactionLogDbService,
    LeavetypeEntitlementDbService,
    CalendarProfileDbService
  ],
})
export class LeaveModule { }
