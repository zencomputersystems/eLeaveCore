import { Module, HttpModule } from '@nestjs/common';
import { LeavetypeService } from './leavetype.service';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { DreamFactory } from 'src/config/dreamfactory';
import { LeaveTypeController } from './leavetype.controller';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';

/**
 * Module for leavetype
 *
 * @export
 * @class LeavetypeModule
 */
@Module({
  controllers: [LeaveTypeController],
  modules: [
    AuthModule,
    PassportModule.register({ session: false }),
    HttpModule.register({ headers: { 'Content-Type': 'application/json', 'X-Dreamfactory-API-Key': DreamFactory.df_key } })
  ],
  providers: [
    LeavetypeService,
    QueryParserService,
    CommonFunctionService
  ]
})
export class LeavetypeModule { }
