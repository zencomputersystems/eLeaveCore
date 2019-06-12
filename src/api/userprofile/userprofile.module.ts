import { Module, HttpModule } from '@nestjs/common';
import { UserprofileService } from './service/userprofile.service';
import { PersonalDetailController } from './controller/personal-detail/personal-detail.controller';
import { EmploymentDetailController } from './controller/employment-detail/employment-detail.controller';
import { LeaveEntitlementController } from './controller/leave-entitlement/leave-entitlement.controller';
import { CertificationDetailController } from './controller/certification-detail/certification-detail.controller';
import { UserprofileController } from './controller/userprofile/userprofile.controller';
import { UserInfoService } from 'src/admin/user-info/user-info.service';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { XMLParserService } from 'src/common/helper/xml-parser.service';
import { DreamFactory } from 'src/config/dreamfactory';
import { AccessLevelValidateService } from 'src/common/helper/access-level-validate.service';
import { UserprofileDbService } from './db/userprofile.db.service';
import { EntitlementDetailController } from './controller/entitlement-detail/entitlement-detail.controller';
import { UserLeaveEntitlementSummaryDbService } from './db/user-leave-summary.db.service';
import { UserLeaveEntitlementDbService } from './db/user-leave-entitlement.db.service';
import { UserLeaveEntitlementService } from './service/user-leave-entitlement.service';
import { LeavetypeEntitlementDbService } from 'src/admin/leavetype-entitlement/db/leavetype-entitlement.db.service';
import { ServiceYearCalc } from 'src/common/policy/entitlement-type/services/service-year-calculation-service/serviceYearCalc.service';
import { ProratedDateEndYearService } from 'src/common/policy/entitlement-type/services/leave-entitlement-type/proratedDateEndYear.service';
import { ProratedDateCurrentMonthService } from 'src/common/policy/entitlement-type/services/leave-entitlement-type/proratedDateCurrentMonth.service';
import { EntitlementRoundingService } from 'src/common/policy/entitlement-rounding/services/entitlement-rounding.service';

@Module({
  providers: [
    UserprofileService,
    UserInfoService,
    UserprofileDbService,
    QueryParserService,
    XMLParserService,
    AccessLevelValidateService,
    UserLeaveEntitlementSummaryDbService,
    UserLeaveEntitlementDbService,
    UserLeaveEntitlementService,
    LeavetypeEntitlementDbService,
    EntitlementRoundingService,
    ServiceYearCalc,
    ProratedDateEndYearService,
    ProratedDateCurrentMonthService
  ],
  modules:[
    HttpModule.register({headers:{'Content-Type':'application/json','X-Dreamfactory-API-Key':DreamFactory.df_key}}),
  ],
  controllers: [
    PersonalDetailController,
    EmploymentDetailController,
    LeaveEntitlementController,
    CertificationDetailController,
    UserprofileController,
    EntitlementDetailController],
})
export class UserprofileModule {}
