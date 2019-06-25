import { Module, HttpModule } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { DreamFactory } from 'src/config/dreamfactory';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { DepartmentDbService } from './db/department.db.service';
import { ResultStatusService } from 'src/common/helper/result-status.service';

/**
 * Module for department
 *
 * @export
 * @class DepartmentModule
 */
@Module({
  modules: [
    AuthModule,
    PassportModule.register({ session: false }),
    HttpModule.register({ headers: { 'Content-Type': 'application/json', 'X-Dreamfactory-API-Key': DreamFactory.df_key } })
  ],
  providers: [
    QueryParserService,
    DepartmentDbService,
    DepartmentService,
    ResultStatusService
  ],
  controllers: [DepartmentController]
})
export class DepartmentModule { }
