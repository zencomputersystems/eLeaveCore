import { Injectable } from "@nestjs/common";
import { of } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import { LeaveTransactionDbService } from "src/api/leave/db/leave-transaction.db.service";
import { LeaveTransactionModel } from "src/api/leave/model/leave-transaction.model";
import { STATESDTO } from "../dto/states.dto";
import { Resource } from "src/common/model/resource.model";

@Injectable()
export class ApprovalService {

    constructor(private leaveTransactionService: LeaveTransactionDbService) {}

    // get tenant company approval policy
    // 3 type
    // 1 = Anyone in hierarchy (ANYONE)
    // 2 = Everyone in herarchy (EVERYONE)
    // 3 = Superior
    getApprovalPolicy() {
        
        return of({
            "approvalType":"EVERYONE",
            "approvalLevel":2
        })

    }

    // get leave applied states
    getAppliedLeaveDetail(leaveTransactionId: string, tenantId: string) {

        const filter = ["(LEAVE_TRANSACTION_GUID="+leaveTransactionId+")","(TENANT_GUID="+tenantId+")"]
        
        return this.leaveTransactionService.findByFilterV2([],filter);
    }

    // trigger when approval policy change
    onPolicyChanged() {

    }

    onApproveReject(leaveTransactionId: string, tenantId: string, approverUserId: string, isApprove: boolean) {

        return this.getAppliedLeaveDetail(leaveTransactionId,tenantId)
            .pipe(
                mergeMap((leaveDetail: LeaveTransactionModel[]) => {
                    if(leaveDetail.length==0) {
                        throw "Leave detail not found";
                    }

                    const leave = leaveDetail[0];

                    if(leave.STATUS !== "PENDING") {
                        throw "Invalid Leave";
                    }

                    return this.getApprovalPolicy()
                        .pipe(
                            map(currentPolicy => {
                                return {currentPolicy,leave}
                            })
                        )
                }),
                mergeMap(result => {

                    if(result.currentPolicy.approvalType.toUpperCase() === "EVERYONE") {
                        result.leave = this.verticalLevel(result.leave,approverUserId,isApprove,result.currentPolicy.approvalLevel);
                    } else {
                        result.leave = this.horizantalLevel(result.leave,approverUserId,isApprove);
                    }

                    result.leave.UPDATE_USER_GUID = approverUserId;

                    const resource = new Resource(new Array());

                    resource.resource.push(result.leave);

                    return this.leaveTransactionService.updateByModel(resource,[],[],[])
                        .pipe(map(res => {
                            if(res.status!=200) {
                                throw "Fail to Update Leave Transaction";
                            }

                            return res.data.resource;
                        }))
                    
                })
            )
        
    }

    private verticalLevel(leave: LeaveTransactionModel,approverUserId: string,isApprove: boolean,currentPolicyLevel: number) {
        leave.CURRENT_APPROVAL_LEVEL = (leave.CURRENT_APPROVAL_LEVEL+1);

        if(leave.STATES==null||leave.STATES=='') {
            leave.STATES = JSON.stringify(new Array<STATESDTO>(new STATESDTO(leave.CURRENT_APPROVAL_LEVEL,approverUserId)));
        } else {
            const currentStates = JSON.parse(leave.STATES);
            currentStates.push(new STATESDTO(leave.CURRENT_APPROVAL_LEVEL,approverUserId));

            leave.STATES = JSON.stringify(currentStates);
        }

        if(isApprove) {
            if(leave.CURRENT_APPROVAL_LEVEL == currentPolicyLevel) {
                leave.STATUS = "APPROVED";
            } else {       
                leave.STATUS = "PENDING";
            }
        } else {
            leave.STATUS = "REJECTED";
        }

        return leave;
        
    }

    private horizantalLevel(leave: LeaveTransactionModel,approverUserId: string,isApprove: boolean) {
        // only 1 level vertically
        leave.CURRENT_APPROVAL_LEVEL = 1;

        leave.STATES = JSON.stringify(new Array<STATESDTO>(new STATESDTO(leave.CURRENT_APPROVAL_LEVEL,approverUserId)));

        if(isApprove) {
            leave.STATUS = "APPROVED";
        } else {
            leave.STATUS = "REJECTED";
        }

        return leave;
    }


}