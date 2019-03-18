import { Injectable } from "@nestjs/common";
import { UserLeaveEntitlementDbService } from "./db/user-leave-entitlement.db.service";
import { AssignLeavePolicyDTO } from "./dto/leave-entitlement/assign-leave-policy.dto";
import { UserprofileDbService } from "./db/userprofile.db.service";
import { map, filter, switchMap, mergeMap } from "rxjs/operators";
import { LeavetypeEntitlementDbService } from "src/admin/leavetype-entitlement/db/leavetype-entitlement.db.service";
import { UserLeaveEntitlementModel } from "./model/user-leave-entitlement.model";
import { v1 } from "uuid";
import { LeaveTypeEntitlementModel } from "src/admin/leavetype-entitlement/model/leavetype_entitlement.model";
import { Resource } from "src/common/model/resource.model";
import { XMLParserService } from "src/common/helper/xml-parser.service";

@Injectable()
export class UserLeaveEntitlementService {
    
    constructor(
        private readonly userLeaveEntitlementDbService: UserLeaveEntitlementDbService,
        private readonly userDbService: UserprofileDbService,
        private readonly leaveEntitlementDbService: LeavetypeEntitlementDbService,
        private readonly xmlParserService: XMLParserService
    ) {}

    public getEntitlementList(user: any) {

    }

    // in one time, only 1 policy can active for each type of main leave
    public assignEntitlement(user: any,data: AssignLeavePolicyDTO) {

        //check if the user belong to this tenant
        const userFilter = ['(USER_GUID='+data.userId+')','(TENANT_GUID='+user.TENANT_GUID+')']

        return this.userDbService.findByFilter([],userFilter)
            .pipe(
                map(res => {
                    if(res.status==200) {
                        const result = res.data.resource;

                        if(result.length > 0) {
                            return result[0]
                        }
                    }
                }),
                filter(x=>x!=null),
                switchMap(res => {

                    //check if current leavetype has active policy
                    const userEntitlementFilter = [
                        '(TENANT_GUID='+user.TENANT_GUID+')',
                        '(ENTITLEMENT_GUID='+data.leaveEntitlementId+')',
                        '(LEAVE_TYPE_GUID='+data.leaveTypeId+')',
                        '(USER_GUID='+data.userId+')',
                        '(ACTIVE_FLAG=1)'
                    ]

                    return this.userLeaveEntitlementDbService.findByFilter([],userEntitlementFilter)
                            .pipe(
                                map(res => {
                                    if(res.status==200) {
                                        const result = res.data.resource;

                                        if(result.length > 0) {
                                            return result[0];
                                        }
                                    }
                                })
                            )

                   
                }),
                filter(x=>x==null),
                switchMap(() => {
                    // check if combination of main leave and entitlement def exist
                    const entitlementFilter = [
                        '(TENANT_GUID='+user.TENANT_GUID+')',
                        '(ENTITLEMENT_GUID='+data.leaveEntitlementId+')',
                        '(LEAVE_TYPE_GUID='+data.leaveTypeId+')',
                        '(ACTIVE_FLAG=true)'
                    ];

                    return this.leaveEntitlementDbService.findByFilter([],entitlementFilter)
                        .pipe(
                            map(res => {
                                if(res.status==200) {
                                    const result = res.data.resource;

                                    if(result.length > 0) {
                                        return result[0];
                                    }
                                }
                            })
                        )
                    
                }),
                filter(x=>x!=null),
                mergeMap((res: LeaveTypeEntitlementModel) => {
                    // assign new policy to user
                    const entitlementModel = new UserLeaveEntitlementModel();
                    entitlementModel.USER_LEAVE_ENTITLEMENT_GUID = v1();
                    entitlementModel.LEAVE_TYPE_GUID = data.leaveTypeId;
                    entitlementModel.ENTITLEMENT_GUID = data.leaveEntitlementId;
                    entitlementModel.USER_GUID = data.userId;

                    entitlementModel.PARENT_FLAG = 1;
                    entitlementModel.CF_FLAG = 0;
                    entitlementModel.DAYS_ADDED = 22;
                    entitlementModel.PROPERTIES_XML = res.PROPERTIES_XML;
                    entitlementModel.YEAR = 2019;
                    entitlementModel.REMARKS = 'this is remark';
                    entitlementModel.ACTIVE_FLAG = 1;
                    
                    entitlementModel.TENANT_GUID = user.TENANT_GUID;
                    entitlementModel.CREATION_USER_GUID = user.USER_GUID;

                    const resource = new Resource(new Array());

                    resource.resource.push(entitlementModel);

                    return this.userLeaveEntitlementDbService.createByModel(resource,[],[],[])
                        .pipe(map(res => {
                            if(res.status==200) {
                                return res.data.resource[0];
                            }
                        }))
                    
                })
            )

    }
}