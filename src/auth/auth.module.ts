import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './passport/local.strategy';
import { JwtStrategy } from './passport/jwt.strategy';
import { UserService } from 'src/admin/user/user.service';
import { UserModule } from 'src/admin/user/user.module';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { ActiveDirectoryStrategy } from './passport/ad.strategy';

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
        JwtStrategy],
    controllers: [
        AuthController
    ],
    imports: [
        PassportModule.register({ session: false }),
        UserModule
    ]
})
export class AuthModule { }
