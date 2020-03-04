import { Module } from '@nestjs/common';
import { getModuleHttp } from '../../common/helper/basic-functions';
import { EntitlementClaimService } from './entitlement-claim.service';
import { EntitlementClaimController } from './entitlement-claim.controller';
import { EntitlementClaimDbService } from './entitlement-claim.db.service';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { EntitlementClaimLogDbService } from './entitlement-claim-log.db.service';

@Module({
  imports: [
    getModuleHttp()
  ],
  providers: [
    EntitlementClaimService,
    EntitlementClaimDbService,
    EntitlementClaimLogDbService,
    QueryParserService
  ],
  controllers: [
    EntitlementClaimController
  ]
})

export class EntitlementClaimModule { }