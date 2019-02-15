import { Module, HttpModule } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';
import { DreamFactory } from 'src/config/dreamfactory';

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
