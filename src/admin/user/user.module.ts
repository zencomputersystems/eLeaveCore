import { Module, HttpModule, MulterModule, BadRequestException } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';
import { DreamFactory } from 'src/config/dreamfactory';
import { UserInfoService } from './user-info/user-info.service';
import { AuthModule } from 'src/auth/auth.module';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { UserImportController } from './user-import/user-import.controller';

@Module({
  controllers: [
    UserController,
    UserImportController
  ],
  providers: [
    UserService,
    UserInfoService,
    QueryParserService
  ],
  modules:[
    PassportModule.register({session: false}),
    HttpModule.register({headers:{'Content-Type':'application/json','X-Dreamfactory-API-Key':DreamFactory.df_key}}),
    MulterModule.register({
      fileFilter : function fileFilter(req, file, cb) {
        if(file.mimetype!="text/csv")
          return cb(new BadRequestException('Only CSV are allowed'),false);
        else
          cb(null, true);
      }
    })
  ]
})
export class UserModule {}
