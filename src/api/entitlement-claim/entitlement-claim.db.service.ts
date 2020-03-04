import { Injectable } from '@nestjs/common';
import { EntitlementClaimLogDbService } from './entitlement-claim-log.db.service';

/**
 * Entitlement claim db service
 *
 * @export
 * @class EntitlementClaimDbService
 * @extends {BaseDBService}
 */
@Injectable()
export class EntitlementClaimDbService {
  /**
   *Creates an instance of EntitlementClaimDbService.
   * @param {EntitlementClaimLogDbService} entitlementClaimLogDbService entitlement-claim log table
   * @memberof EntitlementClaimDbService
   */
  constructor(
    public readonly entitlementClaimLogDbService: EntitlementClaimLogDbService
  ) { }
}
