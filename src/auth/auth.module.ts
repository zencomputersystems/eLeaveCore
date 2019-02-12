import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './passport/local.strategy';

@Module({
    providers: [AuthService, UserService,LocalStrategy],
    controllers: [AuthController],
    imports: [
        PassportModule.register({session: false}),
        UserModule
    ]
  })

@Module({})
export class AuthModule {}
