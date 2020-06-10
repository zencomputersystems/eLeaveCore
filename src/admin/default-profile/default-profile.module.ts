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
    LeavetypeEntitlementDbService
  ],
  controllers: [
    DefaultProfileController,
  ]
})

export class DefaultProfileModule { }