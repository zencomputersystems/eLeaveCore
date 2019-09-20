import { Module, HttpModule } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { DreamFactory } from 'src/config/dreamfactory';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { AnnouncementService } from './announcement.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { AnnouncementController } from './announcement.controller';


/**
 * Module for announcement
 *
 * @export
 * @class AnnouncementModule
 */
@Module({
  modules: [
    AuthModule,
    PassportModule.register({ session: false }),
    HttpModule.register({ headers: { 'Content-Type': 'application/json', 'X-Dreamfactory-API-Key': DreamFactory.df_key } })
  ],
  providers: [
    QueryParserService,
    AnnouncementService,
    CommonFunctionService
  ],
  controllers: [AnnouncementController]
})
export class AnnouncementModule { }