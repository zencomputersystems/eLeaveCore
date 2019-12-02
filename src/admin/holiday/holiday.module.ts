import { Module, HttpModule } from '@nestjs/common';
import { HolidayService } from './holiday.service';
import { HolidayController } from './holiday.controller';
// import { AuthModule } from 'src/auth/auth.module';
// import { PassportModule } from '@nestjs/passport';
import { DreamFactory } from 'src/config/dreamfactory';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { HolidayDbService } from './db/holiday.db.service';
import { AssignerDataService } from 'src/common/helper/assigner-data.service';
import { UserInfoDbService } from './db/user-info.db.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { CalendarProfileDbService } from './db/calendar-profile-db.service';
import { getModuleHttp } from '../../common/helper/basic-functions';

/**
 * Module for holiday
 *
 * @export
 * @class HolidayModule
 */
@Module({
  imports: [
    // AuthModule,
    // PassportModule.register({ session: false }),
    // HttpModule.register({ headers: { 'Content-Type': 'application/json', 'X-Dreamfactory-API-Key': DreamFactory.df_key } })
    getModuleHttp()
  ],
  providers: [
    QueryParserService,
    HolidayDbService,
    UserInfoDbService,
    HolidayService,
    AssignerDataService,
    CommonFunctionService,
    CalendarProfileDbService
  ],
  controllers: [HolidayController]
})
export class HolidayModule { }
