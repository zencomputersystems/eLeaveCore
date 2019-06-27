import { Module, HttpModule } from '@nestjs/common';
import { CostcentreService } from './costcentre.service';
import { CostcentreController } from './costcentre.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { DreamFactory } from 'src/config/dreamfactory';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { SectionService } from '../section/section.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';

/**
 * Module for cost centre
 *
 * @export
 * @class CostcentreModule
 */
@Module({
  controllers: [
    CostcentreController
  ],
  modules: [
    AuthModule,
    PassportModule.register({ session: false }),
    HttpModule.register({ headers: { 'Content-Type': 'application/json', 'X-Dreamfactory-API-Key': DreamFactory.df_key } })
  ],
  providers: [
    QueryParserService,
    CostcentreService,
    SectionService,
    CommonFunctionService
  ]
})
export class CostcentreModule { }
