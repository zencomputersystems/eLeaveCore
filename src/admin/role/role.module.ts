

import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
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

/**
 * Module for role
 *
 * @export
 * @class RoleModule
 */
@Module({
    modules: [
        AuthModule,
        PassportModule.register({ session: false }),
        HttpModule.register({ headers: { 'Content-Type': 'application/json', 'X-Dreamfactory-API-Key': DreamFactory.df_key } })
    ],
    providers: [
        QueryParserService,
        XMLParserService,
        AssignerDataService,
        RoleService,
        RoleDbService,
        AssignerDataService,
        UserInfoDbService,
        CommonFunctionService
    ],
    controllers: [RoleController]
})
export class RoleModule { }