import { Module, HttpModule } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DreamFactory } from '../config/dreamfactory';

@Module({
  controllers: [UserController],
  providers: [UserService],
  modules:[
    HttpModule.register({headers:{'Content-Type':'application/json','X-Dreamfactory-API-Key':DreamFactory.df_key}})
  ]
})
export class UserModule {}
