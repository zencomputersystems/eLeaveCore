import { Module, HttpModule } from '@nestjs/common';
// import { AuthModule } from 'src/auth/auth.module';
// import { PassportModule } from '@nestjs/passport';
import { DreamFactory } from 'src/config/dreamfactory';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { CalendarProfileDbService } from 'src/admin/holiday/db/calendar-profile-db.service';
import { UserInfoDbService } from 'src/admin/holiday/db/user-info.db.service';
import { LeaveTransactionDbService } from '../leave/db/leave-transaction.db.service';
import { DateCalculationService } from 'src/common/calculation/service/date-calculation.service';
import { UserLeaveEntitlementSummaryDbService } from '../userprofile/db/user-leave-summary.db.service';
import { UserLeaveEntitlementDbService } from '../userprofile/db/user-leave-entitlement.db.service';
import { DashboardService } from './service/dashboard.service';
import { DashboardLeaveService } from './service/dashboard-leave.service';
import { DashboardController } from './controller/dashboard.controller';
import { DashboardLeaveController } from './controller/dashboard-leave.controller';
import { DashboardCommonService } from './service/dashboard-common.service';
import { DashboardProcController } from './controller/dashboard-proc.controller';
import { getModuleHttp } from '../../common/helper/basic-functions';
import { UserprofileDbService } from '../userprofile/db/userprofile.db.service';

/**
 * Module for dashboard
 *
 * @export
 * @class DashboardModule
 */
@Module({
    imports: [
        // AuthModule,
        // PassportModule.register({ session: false }),
        // HttpModule.register({ headers: { 'Content-Type': 'application/json', 'X-Dreamfactory-API-Key': DreamFactory.df_key } })
        getModuleHttp()
    ],
    providers: [
        CommonFunctionService,
        DashboardService,
        QueryParserService,
        CalendarProfileDbService,
        UserInfoDbService,
        LeaveTransactionDbService,
        DateCalculationService,
        DashboardLeaveService,
        UserLeaveEntitlementSummaryDbService,
        UserLeaveEntitlementDbService,
        DashboardCommonService,
        UserprofileDbService
    ],
    controllers: [DashboardController, DashboardLeaveController, DashboardProcController]
})
export class DashboardModule { }