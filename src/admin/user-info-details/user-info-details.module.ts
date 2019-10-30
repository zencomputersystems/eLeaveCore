import { Module, HttpModule } from '@nestjs/common';
// import { AuthModule } from 'src/auth/auth.module';
// import { PassportModule } from '@nestjs/passport';
import { UserInfoDetailsController } from './user-info-details.controller';
import { UserInfoDetailsService } from './user-info-details.service';
import { DreamFactory } from 'src/config/dreamfactory';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { UserInfoDbService } from '../holiday/db/user-info.db.service';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { XMLParserService } from 'src/common/helper/xml-parser.service';
import { getModuleHttp } from '../../common/helper/basic-functions';

@Module({
  imports: [
    // AuthModule,
    // PassportModule.register({ session: false }),
    // HttpModule.register({ headers: { 'Content-Type': 'application/json', 'X-Dreamfactory-API-Key': DreamFactory.df_key } })
    getModuleHttp()
  ],
  providers: [
    QueryParserService,
    XMLParserService,
    // AssignerDataService,
    // WorkingHoursService,
    // WorkingHoursDbService,
    // AssignerDataService,
    // UserInfoDbService,
    CommonFunctionService,
    // NotificationService
    UserInfoDetailsService,
    UserInfoDbService
  ],
  controllers: [UserInfoDetailsController]
})
export class UserInfoDetailsModule { }