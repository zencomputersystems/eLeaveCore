import { Injectable, BadRequestException, Logger } from '@nestjs/common';
// import { of } from 'rxjs';
import { EntitlementClaimRequestDto } from './dto/entitlement-claim-request.dto';
import { EntitlementClaimDbService } from './entitlement-claim.db.service';
import { EntitlementClaimApproveDto } from './dto/entitlement-claim-approve.dto';
import { map } from 'rxjs/operators';
import { UserLeaveEntitlementDbService } from '../userprofile/db/user-leave-entitlement.db.service';
import moment = require('moment');
import { UserLeaveEntitlementModel } from '../userprofile/model/user-leave-entitlement.model';
import { Resource } from 'src/common/model/resource.model';
import { v1 } from 'uuid';
import { EntitlementClaimModel } from './model/entitlement-claim.model';
import { logger } from '../../common/middleware/logger.middleware';

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
    private readonly entitlementClaimDbService: EntitlementClaimDbService,
    private readonly userLeaveEntitlementDbService: UserLeaveEntitlementDbService
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
        let result: EntitlementClaimModel = res.data.resource[0];
        console.log(result);
        if (result.STATUS == 'APPROVED') { // When approve create and add entitlement count
          console.log('approve');


          // const resource = new Resource(new Array());

          // //get the entitlement days
          // const entitlementDay = parseInt(result.NO_OF_DAYS);

          // // assign new policy to user
          // const entitlementModel = new UserLeaveEntitlementModel();
          // entitlementModel.USER_LEAVE_ENTITLEMENT_GUID = v1();
          // entitlementModel.LEAVE_TYPE_GUID = result.LEAVE_TYPE_GUID;
          // entitlementModel.ENTITLEMENT_GUID = result.ENTITLEMENT_GUID
          // entitlementModel.USER_GUID = result.USER_GUID;
          // entitlementModel.EXPIREDATE = new Date(moment().add(3, 'M').format('YYYY-MM-DD'));
          // entitlementModel.PARENT_FLAG = 0;
          // entitlementModel.CF_FLAG = 0;
          // // entitlementModel.PROPERTIES_XML = res.res[0].PROPERTIES_XML;
          // entitlementModel.YEAR = moment().year();
          // entitlementModel.REMARKS = null;
          // entitlementModel.ACTIVE_FLAG = 1;

          // entitlementModel.TENANT_GUID = user.TENANT_GUID;
          // entitlementModel.CREATION_USER_GUID = user.USER_GUID;

          // entitlementModel.DAYS_ADDED = entitlementDay;

          // resource.resource.push(entitlementModel);
          // console.log(resource);

          // this.userLeaveEntitlementDbService.createByModel(resource, [], [], []).pipe(
          //   map(res => {
          //     const rsUserLeaveEntitlement = res.status == 200 ? res.data.resource : new BadRequestException();
          //     return rsUserLeaveEntitlement;
          //   })
          // ).subscribe(
          //   data => {
          //     console.log('pass');
          //     console.log(data.data.resource);
          //   }, err => {
          //     console.log('error');
          //     console.log(err);
          //   }
          // );



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