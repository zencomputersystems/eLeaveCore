import { UserInfoDbService } from '../holiday/db/user-info.db.service';
import { Module, HttpModule } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { NotificationService } from './notification.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { NotificationController } from './notification.controller';
import { DreamFactory } from 'src/config/dreamfactory';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { UserInfoService } from '../user-info/user-info.service';
import { XMLParserService } from 'src/common/helper/xml-parser.service';
import { UserService } from '../user/user.service';

@Module({
    modules: [
        AuthModule,
        PassportModule.register({ session: false }),
        HttpModule.register({ headers: { 'Content-Type': 'application/json', 'X-Dreamfactory-API-Key': DreamFactory.df_key } })
    ],
    providers: [
        QueryParserService,
        UserInfoDbService,
        NotificationService,
        CommonFunctionService,
        UserInfoService,
        XMLParserService,
        UserService
    ],
    controllers: [NotificationController]
})
export class NotificationModule { }