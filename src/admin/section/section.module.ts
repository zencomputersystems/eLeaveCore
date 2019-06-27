import { Module, HttpModule } from '@nestjs/common';
import { SectionController } from './section.controller';
import { SectionService } from './section.service';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { DreamFactory } from 'src/config/dreamfactory';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';

/**
 * Module for section
 *
 * @export
 * @class SectionModule
 */
@Module({
  controllers: [SectionController],
  providers: [
    SectionService,
    QueryParserService,
    CommonFunctionService
  ],
  modules: [
    AuthModule,
    PassportModule.register({ session: false }),
    HttpModule.register({ headers: { 'Content-Type': 'application/json', 'X-Dreamfactory-API-Key': DreamFactory.df_key } })
  ]
})
export class SectionModule { }
