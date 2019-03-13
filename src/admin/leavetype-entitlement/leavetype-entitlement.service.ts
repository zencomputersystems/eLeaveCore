import { Injectable } from "@nestjs/common";
import { LeavetypeEntitlementDbService } from "./db/leavetype-entitlement.db.service";
import { map } from "rxjs/operators";
import { LeaveTypeEntitlementListDTO } from "./dto/leavetype-entitlement-list.dto";
import { ViewLeaveTypeSetupModel } from "./model/view-leave-type-setup.model";
import { XMLParserService } from "src/common/helper/xml-parser.service";

@Injectable()
export class LeaveTypeEntitlementService {
    constructor(
        private readonly leavetypeEntitlementDbService: LeavetypeEntitlementDbService,
        private readonly xmlParserService: XMLParserService) {}


    // return list of entitlement for this filter
    public getList(tenantId: string) {
        return this.leavetypeEntitlementDbService.findAll(tenantId)
            .pipe(map(res => {
                if(res.status==200) {
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

    public getDetail(tenantId:string, entitlementId: string) {
        return this.leavetypeEntitlementDbService.findById(tenantId,entitlementId)
                .pipe(map(res => {

                    if(res.status==200) {
                        const data: ViewLeaveTypeSetupModel = res.data.resource[0];

                        data.PROPERTIES_XML = this.xmlParserService.convertXMLToJson(data.PROPERTIES_XML);
                        
                        return data;
                    }
                }))
    }
}