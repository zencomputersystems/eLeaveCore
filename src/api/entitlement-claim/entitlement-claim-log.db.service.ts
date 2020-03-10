import { Injectable, HttpService } from '@nestjs/common';
import { BaseDBService } from 'src/common/base/base-db.service';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { EntitlementClaimRequestDto } from './dto/entitlement-claim-request.dto';
import { Resource } from 'src/common/model/resource.model';
import { EntitlementClaimModel } from './model/entitlement-claim.model';
import { v1 } from 'uuid';

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

  create([entitlementClaimRequestDTO, user]: [EntitlementClaimRequestDto, any]) {
    const resource = new Resource(new Array());
    const data = new EntitlementClaimModel();
    console.log(user);
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
    console.log(resource);
    return this.createByModel(resource, [], [], []);
  }

}