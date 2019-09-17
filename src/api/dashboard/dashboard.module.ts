import { Module, HttpModule } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { DreamFactory } from 'src/config/dreamfactory';
import { DashboardController } from './dashboard.controller';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { DashboardService } from './dashboard.service';
import { DashboardDbService } from './db/dashboard.db.service';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { HolidayDbService } from 'src/admin/holiday/db/holiday.db.service';
import { XMLParserService } from '../../common/helper/xml-parser.service';
import { CalendarProfileDbService } from 'src/admin/holiday/db/calendar-profile-db.service';

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
        DashboardDbService,
        QueryParserService,
        // HolidayDbService,
        XMLParserService,
        CalendarProfileDbService
    ],
    controllers: [DashboardController]
})
export class DashboardModule { }