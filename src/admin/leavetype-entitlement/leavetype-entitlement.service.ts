import { Injectable } from '@nestjs/common';
import { LeavetypeEntitlementDbService } from './db/leavetype-entitlement.db.service';
import { map } from 'rxjs/operators';
import { LeaveTypeEntitlementListDTO } from './dto/leavetype-entitlement-list.dto';
import { ViewLeaveTypeSetupModel } from './model/view-leave-type-setup.model';
import { XMLParserService } from 'src/common/helper/xml-parser.service';

/**
 * Service for leavetype entitlement
 *
 * @export
 * @class LeaveTypeEntitlementService
 */
@Injectable()
export class LeaveTypeEntitlementService {
    constructor(
        private readonly leavetypeEntitlementDbService: LeavetypeEntitlementDbService,
        private readonly xmlParserService: XMLParserService) { }

    /**
     * return list of entitlement for this filter
     *
     * @param {string} tenantId
     * @returns
     * @memberof LeaveTypeEntitlementService
     */
    public getList(tenantId: string) {
        return this.leavetypeEntitlementDbService.findAll(tenantId)
            .pipe(map(res => {
                if (res.status == 200) {
                    const data = res.data.resource;

                    const entitlementList = new Array<LeaveTypeEntitlementListDTO>();

                    data.forEach((element: ViewLeaveTypeSetupModel) => {
                        const entitlementItem = new LeaveTypeEntitlementListDTO();

                        entitlementItem.leaveTypeId = element.LEAVE_TYPE_GUID;
                        entitlementItem.leaveType = element.LEAVE_TYPE_CODE;
                        entitlementItem.leaveEntitlementId = element.ENTITLEMENT_GUID;
                        entitlementItem.leaveEntitlementDescription = element.DESCRIPTION;
                        entitlementItem.leaveEntitlementCode = element.LEAVE_ENTITLEMENT_CODE;

                        entitlementList.push(entitlementItem);
                    });

                    return entitlementList;
                }
            }))
    }

    /**
     * Find leavetype entitlement by id
     *
     * @param {string} tenantId
     * @param {string} entitlementId
     * @returns
     * @memberof LeaveTypeEntitlementService
     */
    public getDetail(tenantId: string, entitlementId: string) {
        return this.leavetypeEntitlementDbService.findById(tenantId, entitlementId)
            .pipe(map(res => {

                if (res.status == 200) {
                    if (res.data.resource.length > 0) {
                        const data: ViewLeaveTypeSetupModel = res.data.resource[0];

                        data.PROPERTIES_XML = this.xmlParserService.convertXMLToJson(data.PROPERTIES_XML);

                        return data;
                    }
                }
            }))
    }
}