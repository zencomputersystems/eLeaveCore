import { Module, HttpModule } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { DreamFactory } from 'src/config/dreamfactory';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { DepartmentDbService } from './db/department.db.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';

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
    CommonFunctionService
  ],
  controllers: [DepartmentController]
})
export class DepartmentModule { }
