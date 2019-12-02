import { Module } from '@nestjs/common';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { AssignerDataService } from 'src/common/helper/assigner-data.service';
import { UserInfoDbService } from '../holiday/db/user-info.db.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { WorkingHoursService } from './working-hours.service';
import { WorkingHoursDbService } from './db/working-hours.db.service';
import { WorkingHoursController } from './working-hours.controller';
import { getModuleHttp } from '../../common/helper/basic-functions';

/**
 * Module for working hours
 *
 * @export
 * @class WorkingHoursModule
 */
@Module({
  imports: [
    getModuleHttp()
  ],
  providers: [
    QueryParserService,
    AssignerDataService,
    WorkingHoursService,
    WorkingHoursDbService,
    AssignerDataService,
    UserInfoDbService,
    CommonFunctionService
  ],
  controllers: [WorkingHoursController]
})
export class WorkingHoursModule { }