import { Module, HttpModule } from '@nestjs/common';
import { ApplyController } from './controller/apply/apply.controller';
import { ApplyLeaveService } from './service/apply-leave.service';
import { UserLeaveEntitlementDbService } from '../userprofile/db/user-leave-entitlement.db.service';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { DreamFactory } from 'src/config/dreamfactory';
import { XMLParserService } from 'src/common/helper/xml-parser.service';
import { LeaveApplicationValidationService } from 'src/common/policy/leave-application-validation/services/leave-application-validation.service';
import { UserInfoService } from 'src/admin/user-info/user-info.service';
import { DateCalculationService } from 'src/common/calculation/service/date-calculation.service';
import { LeaveBalanceValidationService } from 'src/common/policy/leave-application-validation/services/leave-balance-validation.service';
import { EntitledFullService } from 'src/common/policy/entitlement-type/services/leave-entitlement-type/entitledFull.service';
import { ProratedDateCurrentMonthService } from 'src/common/policy/entitlement-type/services/leave-entitlement-type/proratedDateCurrentMonth.service';
import { ProratedDateEndYearService } from 'src/common/policy/entitlement-type/services/leave-entitlement-type/proratedDateEndYear.service';
import { ServiceYearCalc } from 'src/common/policy/entitlement-type/services/service-year-calulation-service/serviceYearCalc.service';
import { EntitlementRoundingService } from 'src/common/policy/entitlement-rounding/services/entitlement-rounding.service';
import { LeaveTransactionDbService } from './db/leave-transaction.db.service';
import { ApprovedController } from './controller/approval/approval.controller';
import { ApprovalService } from 'src/common/approval/service/approval.service';

@Module({
  modules: [
    HttpModule.register({headers:{'Content-Type':'application/json','X-Dreamfactory-API-Key':DreamFactory.df_key}}),
  ],
  controllers: [ApplyController,ApprovedController],
  providers: [
    ApplyLeaveService,
    QueryParserService,
    UserLeaveEntitlementDbService,
    XMLParserService,
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
    ApprovalService
  ],
})
export class LeaveModule {}
