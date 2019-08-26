import { Module, HttpModule } from '@nestjs/common';
import { YearEndClosingController } from './year-end-closing.controller';
import { YearEndClosingService } from './year-end-closing.service';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { DreamFactory } from 'src/config/dreamfactory';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { UserService } from '../user/user.service';
import { UserLeaveEntitlementDbService } from 'src/api/userprofile/db/user-leave-entitlement.db.service';
import { UserInfoDbService } from '../holiday/db/user-info.db.service';
import { LeavetypeEntitlementDbService } from '../leavetype-entitlement/db/leavetype-entitlement.db.service';
import { XMLParserService } from 'src/common/helper/xml-parser.service';
import { CommonFunctionService } from '../../common/helper/common-function.services';
import { UserLeaveEntitlementService } from 'src/api/userprofile/service/user-leave-entitlement.service';
import { UserLeaveEntitlementSummaryDbService } from 'src/api/userprofile/db/user-leave-summary.db.service';
import { UserEntitlementAssignEntitlement } from 'src/api/userprofile/service/userentitlement-assign-entitlement.service';
import { UserprofileDbService } from 'src/api/userprofile/db/userprofile.db.service';
import { UserInfoService } from '../user-info/user-info.service';
import { UserEntitlementAssignPolicy } from 'src/api/userprofile/service/userentitlement-assign-policy.service';
import { ServiceYearCalc } from 'src/common/policy/entitlement-type/services/service-year-calculation-service/serviceYearCalc.service';
import { ProratedDateEndYearService } from 'src/common/policy/entitlement-type/services/leave-entitlement-type/proratedDateEndYear.service';
import { EntitlementRoundingService } from 'src/common/policy/entitlement-rounding/services/entitlement-rounding.service';
import { YearEndAssignPolicy } from './service/year-end-assign-policy.service';
import { YearEndAssignEntitlementService } from './service/year-end-assign-entitlement.service';
import { LeaveEntitlementBaseService } from 'src/common/policy/entitlement-type/services/leave-entitlement-type/leave-entitlement-base.service';


@Module({
  controllers: [YearEndClosingController],
  providers: [
    YearEndClosingService,
    UserService,
    QueryParserService,
    UserLeaveEntitlementDbService,
    UserInfoDbService,
    LeavetypeEntitlementDbService,
    XMLParserService,
    CommonFunctionService,
    UserLeaveEntitlementSummaryDbService,
    UserprofileDbService,
    UserInfoService,
    ServiceYearCalc,
    ProratedDateEndYearService,
    EntitlementRoundingService,
    YearEndAssignPolicy,
    YearEndAssignEntitlementService,
    LeaveEntitlementBaseService
  ],
  modules: [
    AuthModule,
    PassportModule.register({ session: false }),
    HttpModule.register({ headers: { 'Content-Type': 'application/json', 'X-Dreamfactory-API-Key': DreamFactory.df_key } }),
  ]
})
export class YearEndClosingModule { }