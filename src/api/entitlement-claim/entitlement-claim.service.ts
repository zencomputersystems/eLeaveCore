import { Injectable } from '@nestjs/common';
// import { of } from 'rxjs';
import { EntitlementClaimRequestDto } from './dto/entitlement-claim-request.dto';
import { EntitlementClaimDbService } from './entitlement-claim.db.service';
import { EntitlementClaimApproveDto } from './dto/entitlement-claim-approve.dto';
import { map } from 'rxjs/operators';

/**
 * Entitlement claim service
 *
 * @export
 * @class EntitlementClaimService
 */
@Injectable()
export class EntitlementClaimService {
  /**
   *Creates an instance of EntitlementClaimService.
   * @param {EntitlementClaimDbService} entitlementClaimDbService
   * @memberof EntitlementClaimService
   */
  constructor(
    private readonly entitlementClaimDbService: EntitlementClaimDbService
  ) { }

  /**
   * Entitlement claim process
   *
   * @param {[EntitlementClaimRequestDto, any]} [entitlementClaimDTO, user]
   * @returns
   * @memberof EntitlementClaimService
   */
  public entitlementClaimProcess([entitlementClaimDTO, user]: [EntitlementClaimRequestDto, any]) {
    return this.entitlementClaimDbService.entitlementClaimLogDbService.create([entitlementClaimDTO, user]);
    // return of(entitlementClaimDTO);
  }

  /**
   * Get entitlement claim request
   *
   * @param {[string]} [tenantId]
   * @returns
   * @memberof EntitlementClaimService
   */
  public getEntitlementClaim([tenantId]: [string]) {
    return this.entitlementClaimDbService.entitlementClaimLogDbService.findByFilterV2([], [`(TENANT_GUID=${tenantId})`]);
    // return of(tenantId);
  }

  /**
   * Approve entitlement claim
   *
   * @param {[EntitlementClaimApproveDto, any]} [entitlementClaimApproveDto, user]
   * @returns
   * @memberof EntitlementClaimService
   */
  public approveEntitlementClaim([entitlementClaimApproveDto, user]: [EntitlementClaimApproveDto, any]) {
    return this.entitlementClaimDbService.entitlementClaimLogDbService.update([entitlementClaimApproveDto, user]).pipe(
      map(res => {
        console.log(res);
        let result = res.data.resource[0];
        console.log(result);
        if (result.STATUS == 'APPROVED') { // When approve create and add entitlement count
          console.log('approve');
          return res;
        } else { // return status rejected or cancel
          console.log('cancel/reject');
          return res;
        }
      })
    );
    // return of(entitlementClaimId);
  }

}