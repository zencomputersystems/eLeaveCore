import { Injectable } from '@nestjs/common';
import { of } from 'rxjs';
import { map, mergeMap, filter } from 'rxjs/operators';
import { LeaveTransactionDbService } from 'src/api/leave/db/leave-transaction.db.service';
import { LeaveTransactionModel } from 'src/api/leave/model/leave-transaction.model';
import { STATESDTO } from '../dto/states.dto';
import { Resource } from 'src/common/model/resource.model';

/**
 * Service for approval
 *
 * @export
 * @class ApprovalService
 */
@Injectable()
export class ApprovalService {

    /**
     *Creates an instance of ApprovalService.
     * @param {LeaveTransactionDbService} leaveTransactionService
     * @memberof ApprovalService
     */
    constructor(private leaveTransactionService: LeaveTransactionDbService) { }

    /**
     * get tenant company approval policy
     * 3 type
     * 1 = Anyone in hierarchy (ANYONE)
     * 2 = Everyone in herarchy (EVERYONE)
     * 3 = Superior
     *
     * @returns
     * @memberof ApprovalService
     */
    getApprovalPolicy() {

        return of({
            "approvalType": "EVERYONE",
            "approvalLevel": 1
        })

    }

    /**
     * get leave applied states
     *
     * @param {string} leaveTransactionId
     * @param {string} tenantId
     * @returns
     * @memberof ApprovalService
     */
    getAppliedLeaveDetail(leaveTransactionId: string, tenantId: string) {

        const filter = ["(LEAVE_TRANSACTION_GUID=" + leaveTransactionId + ")", "(TENANT_GUID=" + tenantId + ")"]

        return this.leaveTransactionService.findByFilterV2([], filter);
    }


    /**
     * trigger when approval policy change
     * only for EVERYONE and level deducted
     *
     * @param {string} policyType
     * @param {number} policyLevel
     * @param {string} tenantId
     * @returns
     * @memberof ApprovalService
     */
    onPolicyChanged(policyType: string, policyLevel: number, tenantId: string) {

        //get current policy
        return this.getApprovalPolicy()
            .pipe(
                mergeMap(currentPolicy => {

                    // check if current policy is bigger than policy level
                    if (policyType === "EVERYONE" && currentPolicy.approvalLevel > policyLevel) {
                        // find all leave with policy == policyLevel and is pending
                        const filter = ["(TENANT_GUID=" + tenantId + ")", "(CURRENT_APPROVAL_LEVEL=" + policyLevel + ")", "(STATUS=PENDING)"]

                        return this.leaveTransactionService.findByFilterV2([], filter);
                    }
                }),
                filter(x => x.length > 0),
                mergeMap((leaveTransaction: LeaveTransactionModel[]) => {

                    console.log(leaveTransaction);
                    const resource = new Resource(new Array());
                    leaveTransaction.forEach(element => {
                        element.STATUS = "APPROVED";

                        resource.resource.push(element);
                    });

                    if (resource.resource.length > 0) {
                        return this.leaveTransactionService.updateByModel(resource, [], [], [])
                            .pipe(
                                map(data => {
                                    if (data.status != 200) {
                                        throw "Update error";
                                    }
                                    return data.data.resource;
                                })
                            )
                    }
                })
            )
    }


    /**
     * Method on approve reject
     *
     * @param {string} leaveTransactionId
     * @param {string} tenantId
     * @param {string} approverUserId
     * @param {boolean} isApprove
     * @returns
     * @memberof ApprovalService
     */
    onApproveReject([leaveTransactionId, tenantId, approverUserId, isApprove]: [string, string, string, boolean]) {

        return this.getAppliedLeaveDetail(leaveTransactionId, tenantId)
            .pipe(
                mergeMap((leaveDetail: LeaveTransactionModel[]) => {
                    if (leaveDetail.length == 0) {
                        throw "Leave detail not found";
                    }

                    const leave = leaveDetail[0];

                    if (leave.STATUS !== "PENDING") {
                        throw "Invalid Leave";
                    }

                    return this.getApprovalPolicy()
                        .pipe(
                            map(currentPolicy => {
                                return { currentPolicy, leave }
                            })
                        )
                }),
                mergeMap(result => {

                    if (result.currentPolicy.approvalType.toUpperCase() === "EVERYONE") {
                        result.leave = this.verticalLevel([result.leave, approverUserId, isApprove, result.currentPolicy.approvalLevel]);
                    } else {
                        result.leave = this.horizontalLevel(result.leave, approverUserId, isApprove);
                    }

                    result.leave.UPDATE_USER_GUID = approverUserId;

                    const resource = new Resource(new Array());

                    resource.resource.push(result.leave);

                    return this.leaveTransactionService.updateByModel(resource, [], [], [])
                        .pipe(map(res => {
                            if (res.status != 200) {
                                throw "Fail to Update Leave Transaction";
                            }

                            return res.data.resource;
                        }))

                })
            )

    }

    // private verticalLevel(leave: LeaveTransactionModel, approverUserId: string, isApprove: boolean, currentPolicyLevel: number) {

    /**
     * Method vertical level
     *
     * @private
     * @param {[LeaveTransactionModel, string, boolean, number]} [leave, approverUserId, isApprove, currentPolicyLevel]
     * @returns
     * @memberof ApprovalService
     */
    private verticalLevel([leave, approverUserId, isApprove, currentPolicyLevel]: [LeaveTransactionModel, string, boolean, number]) {
        leave.CURRENT_APPROVAL_LEVEL = (leave.CURRENT_APPROVAL_LEVEL + 1);

        if (leave.STATES == null || leave.STATES == '') {
            leave.STATES = JSON.stringify(new Array<STATESDTO>(new STATESDTO(leave.CURRENT_APPROVAL_LEVEL, approverUserId)));
        } else {
            const currentStates = JSON.parse(leave.STATES);
            currentStates.push(new STATESDTO(leave.CURRENT_APPROVAL_LEVEL, approverUserId));

            leave.STATES = JSON.stringify(currentStates);
        }

        if (isApprove) {
            if (leave.CURRENT_APPROVAL_LEVEL == currentPolicyLevel) {
                leave.STATUS = "APPROVED";
            } else {
                leave.STATUS = "PENDING";
            }
        } else {
            leave.STATUS = "REJECTED";
        }

        return leave;

    }

    /**
     * Method horizontal level
     *
     * @private
     * @param {LeaveTransactionModel} leave
     * @param {string} approverUserId
     * @param {boolean} isApprove
     * @returns
     * @memberof ApprovalService
     */
    private horizontalLevel(leave: LeaveTransactionModel, approverUserId: string, isApprove: boolean) {
        // only 1 level vertically
        leave.CURRENT_APPROVAL_LEVEL = 1;

        leave.STATES = JSON.stringify(new Array<STATESDTO>(new STATESDTO(leave.CURRENT_APPROVAL_LEVEL, approverUserId)));

        if (isApprove) {
            leave.STATUS = "APPROVED";
        } else {
            leave.STATUS = "REJECTED";
        }

        return leave;
    }


}