import { Module } from '@nestjs/common';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { AssignerDataService } from 'src/common/helper/assigner-data.service';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { RoleDbService } from './db/role.db.service';
import { UserInfoDbService } from '../holiday/db/user-info.db.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { getModuleHttp } from '../../common/helper/basic-functions';

/**
 * Module for role
 *
 * @export
 * @class RoleModule
 */
@Module({
    imports: [
        getModuleHttp()
    ],
    providers: [
        QueryParserService,
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