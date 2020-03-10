import { Injectable, HttpService } from '@nestjs/common';
import { BaseDBService } from 'src/common/base/base-db.service';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { EntitlementClaimRequestDto } from './dto/entitlement-claim-request.dto';
import { Resource } from 'src/common/model/resource.model';
import { EntitlementClaimModel } from './model/entitlement-claim.model';
import { v1 } from 'uuid';
import { EntitlementClaimApproveDto } from './dto/entitlement-claim-approve.dto';
import { setUpdateData } from '../../common/helper/basic-functions';

/**
 * Entitlement claim log db service
 *
 * @export
 * @class EntitlementClaimLogDbService
 * @extends {BaseDBService}
 */
@Injectable()
export class EntitlementClaimLogDbService extends BaseDBService {
  /**
   *Creates an instance of EntitlementClaimDbService.
   * @param {HttpService} httpService Http service
   * @param {QueryParserService} queryService Query service
   * @memberof EntitlementClaimDbService
   */
  constructor(
    public readonly httpService: HttpService,
    public readonly queryService: QueryParserService
  ) {
    super(httpService, queryService, "l_entitlement_claim")
  }

  /**
   * Create entitlement claim request
   *
   * @param {[EntitlementClaimRequestDto, any]} [entitlementClaimRequestDTO, user]
   * @returns
   * @memberof EntitlementClaimLogDbService
   */
  create([entitlementClaimRequestDTO, user]: [EntitlementClaimRequestDto, any]) {
    const resource = new Resource(new Array());
    const data = new EntitlementClaimModel();

    data.ENTITLEMENT_CLAIM_GUID = v1();
    data.TENANT_GUID = user.TENANT_GUID;
    data.USER_GUID = entitlementClaimRequestDTO.userGuid;
    data.LEAVE_TYPE_GUID = entitlementClaimRequestDTO.leavetypeGuid;
    data.START_DATE = entitlementClaimRequestDTO.startDate;
    data.END_DATE = entitlementClaimRequestDTO.endDate;
    data.NO_OF_DAYS = entitlementClaimRequestDTO.noOfDays;
    data.STATUS = 'PENDING';
    data.REQUEST_REMARKS = entitlementClaimRequestDTO.requestRemarks;
    data.CREATION_USER_GUID = user.USER_GUID;
    data.ATTACHMENT = entitlementClaimRequestDTO.attachment;

    resource.resource.push(data);

    return this.createByModel(resource, [], [], []);
  }

  /**
   * Update entitlement claim approve
   *
   * @param {[EntitlementClaimApproveDto, any]} [entitlementClaimApproveDTO, user]
   * @returns
   * @memberof EntitlementClaimLogDbService
   */
  update([entitlementClaimApproveDTO, user]: [EntitlementClaimApproveDto, any]) {
    const resource = new Resource(new Array());
    const data = new EntitlementClaimModel();

    data.ENTITLEMENT_CLAIM_GUID = entitlementClaimApproveDTO.entitlementClaimId;
    data.STATUS = entitlementClaimApproveDTO.status;
    data.FINAL_APPROVAL_REMARKS = entitlementClaimApproveDTO.finalApprovalRemarks;
    setUpdateData([data, user.USER_GUID]);

    resource.resource.push(data);

    return this.updateByModel(resource, ['*'], [], []);
  }

}