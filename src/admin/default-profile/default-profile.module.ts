import { Module } from '@nestjs/common';
import { getModuleHttp } from '../../common/helper/basic-functions';
import { DefaultProfileService } from './default-profile.service';
import { DefaultProfileController } from './default-profile.controller';
import { RoleDbService } from '../role/db/role.db.service';
import { WorkingHoursDbService } from '../working-hours/db/working-hours.db.service';
import { CalendarProfileDbService } from '../holiday/db/calendar-profile-db.service';
import { HolidayDbService } from '../holiday/db/holiday.db.service';
import { QueryParserService } from '../../common/helper/query-parser.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { LeavetypeService } from '../leavetype/leavetype.service';
import { LeavetypeEntitlementDbService } from '../leavetype-entitlement/db/leavetype-entitlement.db.service';
import { ProfileDefaultDbService } from '../profile-default/profile-default.db.service';
import { UserInfoService } from '../user-info/user-info.service';
import { UserLeaveEntitlementDbService } from 'src/api/userprofile/db/user-leave-entitlement.db.service';
import { ServiceYearCalc } from 'src/common/policy/entitlement-type/services/service-year-calculation-service/serviceYearCalc.service';
import { ProratedDateEndYearService } from 'src/common/policy/entitlement-type/services/leave-entitlement-type/proratedDateEndYear.service';
import { EntitlementRoundingService } from 'src/common/policy/entitlement-rounding/services/entitlement-rounding.service';
import { CompanyDbService } from '../company/company.service';
import { GeneralLeavePolicyService } from '../general-leave-policy/general-leave-policy.service';
import { AttendanceProfileDbService } from './attendance-profile.db.service';

@Module({
  imports: [
    getModuleHttp()
  ],
  providers: [
    DefaultProfileService,
    RoleDbService,
    WorkingHoursDbService,
    CalendarProfileDbService,
    HolidayDbService,
    QueryParserService,
    CommonFunctionService,
    LeavetypeService,
    LeavetypeEntitlementDbService,
    ProfileDefaultDbService,
    UserInfoService,
    UserLeaveEntitlementDbService,
    ServiceYearCalc,
    ProratedDateEndYearService,
    EntitlementRoundingService,
    CompanyDbService,
    GeneralLeavePolicyService,
    AttendanceProfileDbService
  ],
  controllers: [
    DefaultProfileController,
  ]
})

export class DefaultProfileModule { }