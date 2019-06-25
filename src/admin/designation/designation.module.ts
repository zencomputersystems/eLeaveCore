import { Module, HttpModule } from '@nestjs/common';
import { DesignationService } from './designation.service';
import { DesignationController } from './designation.controller';
import { DesignationDbService } from './db/designation.db.service';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { DreamFactory } from 'src/config/dreamfactory';
import { ResultStatusService } from 'src/common/helper/result-status.service';

/**
 * Module for designation
 *
 * @export
 * @class DesignationModule
 */
@Module({
  modules: [
    AuthModule,
    PassportModule.register({ session: false }),
    HttpModule.register({ headers: { 'Content-Type': 'application/json', 'X-Dreamfactory-API-Key': DreamFactory.df_key } })
  ],
  providers: [
    DesignationService,
    DesignationDbService,
    QueryParserService,
    ResultStatusService
  ],
  controllers: [DesignationController]
})
export class DesignationModule { }
