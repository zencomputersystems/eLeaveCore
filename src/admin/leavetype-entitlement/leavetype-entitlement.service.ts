import { Injectable } from '@nestjs/common';
import { LeavetypeEntitlementDbService } from './db/leavetype-entitlement.db.service';
import { map, mergeMap } from 'rxjs/operators';
import { LeaveTypeEntitlementListDTO } from './dto/leavetype-entitlement-list.dto';
import { ViewLeaveTypeSetupModel } from './model/view-leave-type-setup.model';
import { PendingLeaveService } from '../approval-override/pending-leave.service';
/** XMLparser from zen library  */
var { convertXMLToJson } = require('@zencloudservices/xmlparser');

/**
 * Service for leavetype entitlement
 *
 * @export
 * @class LeaveTypeEntitlementService
 */
@Injectable()
export class LeaveTypeEntitlementService {
    /**
     *Creates an instance of LeaveTypeEntitlementService.
     * @param {LeavetypeEntitlementDbService} leavetypeEntitlementDbService leavetype entitlement db service
     * @memberof LeaveTypeEntitlementService
     */
    constructor(
        public readonly leavetypeEntitlementDbService: LeavetypeEntitlementDbService,
        public readonly pendingLeaveService: PendingLeaveService
    ) { }

    /**
     * return list of entitlement for this filter
     *
     * @param {string} tenantId
     * @returns
     * @memberof LeaveTypeEntitlementService
     */
    public getList(tenantId: string) {
        return this.leavetypeEntitlementDbService.findAll(tenantId)
            .pipe(
                mergeMap(async res => {
                    let userData = await this.pendingLeaveService.getAllUserInfo(tenantId) as any[];
                    return { res, userData };
                }
                ),
                map(result => {
                    let { res, userData } = result;
                    if (res.status == 200) {
                        const data = res.data.resource;

                        const entitlementList = new Array<LeaveTypeEntitlementListDTO>();

                        data.forEach((element: ViewLeaveTypeSetupModel) => {
                            const entitlementItem = new LeaveTypeEntitlementListDTO();

                            entitlementItem.leaveEntitlementId = element.ENTITLEMENT_GUID;
                            entitlementItem.leaveEntitlementDescription = element.DESCRIPTION;
                            entitlementItem.leaveEntitlementCode = element.LEAVE_ENTITLEMENT_CODE;
                            entitlementItem.leaveTypeId = element.LEAVE_TYPE_GUID;
                            entitlementItem.leaveType = element.LEAVE_TYPE_CODE;
                            entitlementItem.leaveTypeAbbr = element.LEAVE_TYPE_ABBR;
                            entitlementItem.totalEmployee = element.TOTAL_EMPLOYEE_ATTACH;

                            let userAttachArr = [];
                            let userId = element.USER_ATTACH.split(",");

                            if (userId.length > 0) {
                                userId.forEach(userAttach => {
                                    const userFullname = userData.find(x => x.USER_GUID === userAttach);
                                    if (userFullname) {
                                        let userInfo = {};
                                        userInfo['guid'] = userAttach;
                                        userInfo['employeeName'] = userFullname.FULLNAME;
                                        userAttachArr.push(userInfo);
                                    }
                                });
                            }
                            entitlementItem.userAttach = userAttachArr;

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

                        data.PROPERTIES_XML = convertXMLToJson(data.PROPERTIES_XML);

                        return data;
                    }
                }
            }))
    }
}