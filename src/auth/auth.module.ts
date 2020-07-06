import { Module, HttpService, HttpModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './passport/local.strategy';
import { JwtStrategy } from './passport/jwt.strategy';
import { UserService } from 'src/admin/user/user.service';
import { UserModule } from 'src/admin/user/user.module';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { ActiveDirectoryStrategy } from './passport/ad.strategy';
import { DreamFactory } from 'src/config/dreamfactory';
import { getModuleHttp } from '../common/helper/basic-functions';
import { AuthDbService } from './auth.db.service';
import { ProfileDefaultDbService } from 'src/admin/profile-default/profile-default.db.service';
import { UserprofileDbService } from 'src/api/userprofile/db/userprofile.db.service';
import { RoleDbService } from 'src/admin/role/db/role.db.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';

/**
 * Module for auth
 *
 * @export
 * @class AuthModule
 */
@Module({
    providers: [
        QueryParserService,
        AuthService,
        UserService,
        LocalStrategy,
        ActiveDirectoryStrategy,
        JwtStrategy,
        AuthDbService,
        ProfileDefaultDbService,
        UserprofileDbService,
        RoleDbService,
        CommonFunctionService
    ],
    controllers: [
        AuthController
    ],
    imports: [
        PassportModule.register({ session: false }),
        HttpModule.register({ headers: { 'Content-Type': 'application/json', 'X-Dreamfactory-API-Key': DreamFactory.df_key } }),
        // getModuleHttp(),
        UserModule
    ]
})
export class AuthModule { }
