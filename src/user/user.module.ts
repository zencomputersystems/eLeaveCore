import { Module, HttpModule } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DreamFactory } from '../config/dreamfactory';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
  ],
  modules:[
    PassportModule.register({session: false}),
    HttpModule.register({headers:{'Content-Type':'application/json','X-Dreamfactory-API-Key':DreamFactory.df_key}})
  ]
})
export class UserModule {}
