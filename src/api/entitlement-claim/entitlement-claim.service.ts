import { Injectable, BadRequestException, Logger } from '@nestjs/common';
// import { of, forkJoin } from 'rxjs';
import { EntitlementClaimRequestDto } from './dto/entitlement-claim-request.dto';
import { EntitlementClaimDbService } from './entitlement-claim.db.service';
import { EntitlementClaimApproveDto } from './dto/entitlement-claim-approve.dto';
import { map, mergeMap } from 'rxjs/operators';
import { UserLeaveEntitlementDbService } from '../userprofile/db/user-leave-entitlement.db.service';
import moment = require('moment');
import { UserLeaveEntitlementModel } from '../userprofile/model/user-leave-entitlement.model';
import { Resource } from 'src/common/model/resource.model';
import { v1 } from 'uuid';
import { EntitlementClaimModel } from './model/entitlement-claim.model';
import { logger } from '../../common/middleware/logger.middleware';
import { LeaveTypePropertiesXmlDTO } from 'src/admin/leavetype-entitlement/dto/xml/leavetype-properties.xml.dto';
import { LeavetypeService } from 'src/admin/leavetype/leavetype.service';
import { forkJoin } from 'rxjs';
/** XMLparser from zen library  */
var { convertXMLToJson } = require('@zencloudservices/xmlparser');

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
    private readonly userLeaveEntitlementDbService: UserLeaveEntitlementDbService,
    private readonly leavetypeService: LeavetypeService
  ) { }

  public availableClaimLeavetype([user]: [any]) {
    return this.userLeaveEntitlementDbService.findByFilterV2([], [`(USER_GUID=${user.USER_GUID})`, '(YEAR=' + moment().format('YYYY') + ')', `(PARENT_FLAG=1)`]).pipe(
      mergeMap(res => {
        let leavetypeList = this.leavetypeService.findByFilterV2([], [`(TENANT_GUID=${user.TENANT_GUID})`]);
        return forkJoin(res, leavetypeList);
      }),
      map(res => {
        console.log(res[0]);
        let availableLeave = [];
        res[0].forEach(element => {
          const dataXml: LeaveTypePropertiesXmlDTO = convertXMLToJson(element.PROPERTIES_XML);
          if (dataXml.claimEntitlement == true) {
            delete element.PROPERTIES_XML;
            availableLeave.push(element);
          }
        });
        return availableLeave;
      })
    )
  }

  /**
   * Entitlement claim process
   *
   * @param {[EntitlementClaimRequestDto, any]} [entitlementClaimDTO, user]
   * @returns
   * @memberof EntitlementClaimService
   */
  public entitlementClaimProcess([entitlementClaimDTO, user]: [EntitlementClaimRequestDto, any]) {
    this.userLeaveEntitlementDbService.findByFilterV2([], [`(USER_GUID=${entitlementClaimDTO.userGuid})`, '(YEAR=' + moment().format('YYYY') + ')', `(LEAVE_TYPE_GUID=${entitlementClaimDTO.leavetypeGuid})`, `(PARENT_FLAG=1)`]).pipe(
      map(res => {
        return res;
      })
    ).subscribe(
      data => {
        if (data.length > 0) {
          const dataXml: LeaveTypePropertiesXmlDTO = convertXMLToJson(data[0].PROPERTIES_XML);
          if (dataXml.claimEntitlement == true) { // Policy allow to claim entitlement 
            console.log('Apply request');
          } else { // policy does not allow claim process
            console.log('Entitlement claim is not allowed');
          }
        } else { // user does not entitled to requested leavetype
          console.log('Leavetype is not assigned');
        }
      },
      err => {
        console.log(err);
      }
    );

    return this.entitlementClaimDbService.entitlementClaimLogDbService.create([entitlementClaimDTO, user]);
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
        let result: EntitlementClaimModel = res.data.resource[0];

        if (result.STATUS == 'APPROVED') { // When approve create and add entitlement count

          const resource = new Resource(new Array());

          //get the entitlement days (need to be decimal)
          const entitlementDay = parseInt(result.NO_OF_DAYS);

          // assign new policy to user
          const entitlementModel = new UserLeaveEntitlementModel();
          entitlementModel.USER_LEAVE_ENTITLEMENT_GUID = v1();
          entitlementModel.LEAVE_TYPE_GUID = result.LEAVE_TYPE_GUID;
          // entitlementModel.ENTITLEMENT_GUID = result.ENTITLEMENT_GUID;
          entitlementModel.ENTITLEMENT_GUID = 'f18ced20-3769-11ea-a6a7-350996fd5f7b';
          entitlementModel.USER_GUID = result.USER_GUID;
          entitlementModel.EXPIREDATE = new Date(moment().add(3, 'M').format('YYYY-MM-DD'));

          entitlementModel.PARENT_FLAG = 0;
          entitlementModel.CF_FLAG = 0;
          // entitlementModel.PROPERTIES_XML = res.res[0].PROPERTIES_XML;
          entitlementModel.YEAR = moment().year();
          entitlementModel.REMARKS = null;
          entitlementModel.ACTIVE_FLAG = 1;

          entitlementModel.TENANT_GUID = user.TENANT_GUID;
          entitlementModel.CREATION_USER_GUID = user.USER_GUID;

          entitlementModel.DAYS_ADDED = entitlementDay;

          resource.resource.push(entitlementModel);

          this.userLeaveEntitlementDbService.createByModel(resource, [], [], []).pipe(
            map(res => {
              const rsUserLeaveEntitlement = res.status == 200 ? res.data.resource : new BadRequestException();
              return rsUserLeaveEntitlement;
            })
          ).subscribe(
            data => { console.log('pass'); },
            err => { console.log('error'); }
          );

          return res;

        } else { // return status rejected or cancel
          console.log('cancel/reject');

          return res;
        }
      })
    );

  }

}