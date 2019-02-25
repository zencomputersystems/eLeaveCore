import { Module, HttpModule, MulterModule, BadRequestException } from '@nestjs/common';
import { UserImportController } from './user-import.controller';
import { UserImportService } from './user-import.service';
import { PassportModule } from '@nestjs/passport';
import { DreamFactory } from 'src/config/dreamfactory';
import { UserService } from '../user/user.service';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { BranchService } from '../branch/branch.service';
import { CostcentreService } from '../costcentre/costcentre.service';
import { SectionService } from '../section/section.service';

@Module({
  controllers: [UserImportController],
  providers: [
    UserImportService,
    UserService,
    BranchService,
    CostcentreService,
    SectionService,
    QueryParserService
  ],
  modules: [
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
export class UserImportModule {}
