import { Injectable } from '@nestjs/common';
// import { of } from 'rxjs';
import { EntitlementClaimRequestDto } from './dto/entitlement-claim-request.dto';
import { EntitlementClaimDbService } from './entitlement-claim.db.service';
import { EntitlementClaimApproveDto } from './dto/entitlement-claim-approve.dto';

@Injectable()
export class EntitlementClaimService {
  constructor(
    private readonly entitlementClaimDbService: EntitlementClaimDbService
  ) { }

  public entitlementClaimProcess([entitlementClaimDTO, user]: [EntitlementClaimRequestDto, any]) {
    return this.entitlementClaimDbService.entitlementClaimLogDbService.create([entitlementClaimDTO, user]);
    // return of(entitlementClaimDTO);
  }

  public getEntitlementClaim([tenantId]: [string]) {
    return this.entitlementClaimDbService.entitlementClaimLogDbService.findByFilterV2([], [`(TENANT_GUID=${tenantId})`]);
    // return of(tenantId);
  }

  public approveEntitlementClaim([entitlementClaimApproveDto, user]: [EntitlementClaimApproveDto, any]) {
    return this.entitlementClaimDbService.entitlementClaimLogDbService.update([entitlementClaimApproveDto, user]);
    // return of(entitlementClaimId);
  }

}