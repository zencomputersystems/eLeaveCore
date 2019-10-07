

import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { HttpModule, Module } from '@nestjs/common';
import { DreamFactory } from 'src/config/dreamfactory';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { XMLParserService } from 'src/common/helper/xml-parser.service';
import { AssignerDataService } from 'src/common/helper/assigner-data.service';
import { UserInfoDbService } from '../holiday/db/user-info.db.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { NotificationService } from '../notification/notification.service';
import { WorkingHoursService } from './working-hours.service';
import { WorkingHoursDbService } from './db/working-hours.db.service';
import { WorkingHoursController } from './working-hours.controller';

/**
 * Module for working hours
 *
 * @export
 * @class WorkingHoursModule
 */
@Module({
  imports: [
    AuthModule,
    PassportModule.register({ session: false }),
    HttpModule.register({ headers: { 'Content-Type': 'application/json', 'X-Dreamfactory-API-Key': DreamFactory.df_key } })
  ],
  providers: [
    QueryParserService,
    XMLParserService,
    AssignerDataService,
    WorkingHoursService,
    WorkingHoursDbService,
    AssignerDataService,
    UserInfoDbService,
    CommonFunctionService,
    NotificationService
  ],
  controllers: [WorkingHoursController]
})
export class WorkingHoursModule { }