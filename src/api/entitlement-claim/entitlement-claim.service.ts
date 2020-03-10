import { Injectable } from '@nestjs/common';
import { of } from 'rxjs';
import { EntitlementClaimRequestDto } from './dto/entitlement-claim-request.dto';
import { EntitlementClaimDbService } from './entitlement-claim.db.service';

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
    return of(tenantId);
  }

  public approveEntitlementClaim([entitlementClaimId]: [string]) {
    return of(entitlementClaimId);
  }

}