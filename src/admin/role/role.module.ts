

// import { AuthModule } from 'src/auth/auth.module';
// import { PassportModule } from '@nestjs/passport';
import { HttpModule, Module } from '@nestjs/common';
import { DreamFactory } from 'src/config/dreamfactory';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { XMLParserService } from 'src/common/helper/xml-parser.service';
import { AssignerDataService } from 'src/common/helper/assigner-data.service';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { RoleDbService } from './db/role.db.service';
import { UserInfoDbService } from '../holiday/db/user-info.db.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { NotificationService } from '../notification/notification.service';
import { getModuleHttp } from '../../common/helper/basic-functions';

/**
 * Module for role
 *
 * @export
 * @class RoleModule
 */
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
        AssignerDataService,
        RoleService,
        RoleDbService,
        AssignerDataService,
        UserInfoDbService,
        CommonFunctionService,
        NotificationService
    ],
    controllers: [RoleController]
})
export class RoleModule { }