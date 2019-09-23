import { Module, HttpModule } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { DreamFactory } from 'src/config/dreamfactory';
import { DashboardController } from './dashboard.controller';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { DashboardService } from './dashboard.service';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { XMLParserService } from '../../common/helper/xml-parser.service';
import { CalendarProfileDbService } from 'src/admin/holiday/db/calendar-profile-db.service';
import { UserInfoDbService } from 'src/admin/holiday/db/user-info.db.service';
import { LeaveTransactionDbService } from '../leave/db/leave-transaction.db.service';
import { DateCalculationService } from 'src/common/calculation/service/date-calculation.service';
import { DashboardLeaveService } from './dashboard-leave.service';
import { UserLeaveEntitlementSummaryDbService } from '../userprofile/db/user-leave-summary.db.service';
import { UserLeaveEntitlementDbService } from '../userprofile/db/user-leave-entitlement.db.service';

/**
 * Module for dashboard
 *
 * @export
 * @class DashboardModule
 */
@Module({
    modules: [
        AuthModule,
        PassportModule.register({ session: false }),
        HttpModule.register({ headers: { 'Content-Type': 'application/json', 'X-Dreamfactory-API-Key': DreamFactory.df_key } })
    ],
    providers: [
        CommonFunctionService,
        DashboardService,
        QueryParserService,
        XMLParserService,
        CalendarProfileDbService,
        UserInfoDbService,
        LeaveTransactionDbService,
        DateCalculationService,
        DashboardLeaveService,
        UserLeaveEntitlementSummaryDbService,
        UserLeaveEntitlementDbService
    ],
    controllers: [DashboardController]
})
export class DashboardModule { }