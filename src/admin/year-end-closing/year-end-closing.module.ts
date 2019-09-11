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
import { UserLeaveEntitlementSummaryDbService } from 'src/api/userprofile/db/user-leave-summary.db.service';
import { UserprofileDbService } from 'src/api/userprofile/db/userprofile.db.service';
import { UserInfoService } from '../user-info/user-info.service';
import { ServiceYearCalc } from 'src/common/policy/entitlement-type/services/service-year-calculation-service/serviceYearCalc.service';
import { ProratedDateEndYearService } from 'src/common/policy/entitlement-type/services/leave-entitlement-type/proratedDateEndYear.service';
import { EntitlementRoundingService } from 'src/common/policy/entitlement-rounding/services/entitlement-rounding.service';
import { LeaveEntitlementBaseService } from 'src/common/policy/entitlement-type/services/leave-entitlement-type/leave-entitlement-base.service';
import { GeneralLeavePolicyService } from '../general-leave-policy/general-leave-policy.service';


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
    LeaveEntitlementBaseService,
    GeneralLeavePolicyService
  ],
  modules: [
    AuthModule,
    PassportModule.register({ session: false }),
    HttpModule.register({ headers: { 'Content-Type': 'application/json', 'X-Dreamfactory-API-Key': DreamFactory.df_key } }),
  ]
})
export class YearEndClosingModule { }