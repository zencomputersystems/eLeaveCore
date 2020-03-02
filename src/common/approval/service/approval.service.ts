import { Injectable } from '@nestjs/common';
import { of } from 'rxjs';
import { map, mergeMap, filter, flatMap } from 'rxjs/operators';
import { LeaveTransactionDbService } from 'src/api/leave/db/leave-transaction.db.service';
import { LeaveTransactionModel } from 'src/api/leave/model/leave-transaction.model';
import { STATESDTO } from '../dto/states.dto';
import { Resource } from 'src/common/model/resource.model';
import { UserprofileDbService } from '../../../api/userprofile/db/userprofile.db.service';
import { ApprovedLeaveDTO } from 'src/api/leave/dto/approved-leave.dto';
import { LeaveTransactionLogDbService } from '../../../api/leave/db/leave-transaction-log.db.service';
/** XMLparser from zen library  */
var { convertXMLToJson } = require('@zencloudservices/xmlparser');

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
	 * @param {UserprofileDbService} userprofileDbService
	 * @memberof ApprovalService
	 */
	constructor(
		private leaveTransactionService: LeaveTransactionDbService,
		private userprofileDbService: UserprofileDbService,
		private leaveTransactionLogDbService: LeaveTransactionLogDbService
	) { }

	/**
	 *Get manager list
	 *
	 * @param {[string]} [userId]
	 * @returns
	 * @memberof ApprovalService
	 */
	getManagerList([userId]: [string]) {
		let managerList = this.getManagerId([userId]).then(
			async data => {
				let temp: string[] = data as string[];
				let dataManager = [];
				do {
					dataManager.push(temp[0]['MANAGER_USER_GUID']);
					temp = await this.getManagerId([temp[0]['MANAGER_USER_GUID']]) as string[];
				} while (dataManager.indexOf(temp[0]['MANAGER_USER_GUID']) == -1)
				return dataManager;
			}
		);
		return managerList;
	}

	/**
	 * Get manager id
	 *
	 * @param {[string]} [userId]
	 * @returns
	 * @memberof ApprovalService
	 */
	async getManagerId([userId]: [string]) {
		const getManagerProcess = () => {
			return new Promise((resolve, reject) => {
				this.userprofileDbService.findByFilterV2(['MANAGER_USER_GUID'], ['(USER_GUID=' + userId + ')']).subscribe(
					data => {
						resolve(data);
					}, err => {
						return reject(err);
					}
				);
			});
		}
		return await getManagerProcess();
	}

	/**
	 * Get approval policy
	 *
	 * @param {string} leaveTransactionId
	 * @returns
	 * @memberof ApprovalService
	 */
	getApprovalPolicyTemp(leaveTransactionId: string) {
		return this.leaveTransactionService.findByFilterV2([], ['(LEAVE_TRANSACTION_GUID=' + leaveTransactionId + ')']).pipe(
			map(res => {
				let jsonXMLSnapshot = convertXMLToJson(res[0].ENTITLEMENT_XML_SNAPSHOT);

				let jsonGeneralPolicy = jsonXMLSnapshot.root.generalLeavePolicy;
				let dataLevel = {};

				dataLevel['approvalType'] = jsonGeneralPolicy.approvalConfirmation.requirement;
				dataLevel['approvalLevel'] = jsonGeneralPolicy.approvalConfirmation.approvalLevel;
				return dataLevel;
			})
		);

		// return of({
		//     "approvalType": "EVERYONE",
		//     "approvalLevel": 1
		// })
	}

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
	// onPolicyChanged(policyType: string, policyLevel: number, tenantId: string) {

	onPolicyChanged([policyType, policyLevel, tenantId]: [string, number, string]) {

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
	onApproveReject([leaveTransaction, tenantId, approverUserId, isApprove, statusApprove]: [ApprovedLeaveDTO, string, string, boolean, string]) {
		const leaveTransactionId = leaveTransaction.id;
		const leaveTransactionReason = leaveTransaction.reason;
		return this.getAppliedLeaveDetail(leaveTransactionId, tenantId)
			.pipe(
				mergeMap((leaveDetail: LeaveTransactionModel[]) => {
					let leave = this.findLeaveData([leaveDetail]);
					// if (leaveDetail.length == 0) {
					// 	throw "Leave detail not found";
					// }

					// const leave = leaveDetail[0];

					// if (leave.STATUS !== "PENDING") {
					// 	throw "Invalid Leave";
					// }

					// return this.getApprovalPolicy()
					return this.getApprovalPolicyTemp(leaveTransactionId)
						.pipe(
							map(currentPolicy => {
								return { currentPolicy, leave }
							})
						)
				}),
				mergeMap(async result => {
					if (statusApprove == 'approved' || statusApprove == 'rejected') {
						// validate manager approval
						let resDatatemp = await this.getManagerList([result.leave.USER_GUID]).then(res => { return res; });

						this.validateLeaveStatus([resDatatemp, approverUserId, result]);
						// if (!resDatatemp.includes(approverUserId)) {
						// 	throw "Approval process not valid"; // User is not his/her manager
						// } else {
						// 	// Check current approval level
						// 	if (result.leave.STATES != null && result.leave.STATES != '') {
						// 		const currentStates = JSON.parse(result.leave.STATES);
						// 		const approveMngId = currentStates.filter(x => x.userId === approverUserId);
						// 		// check if manager already approve
						// 		if (approveMngId.length > 0)
						// 			throw "You already approve this employee";
						// 	}
						// }
					}

					// if (result.currentPolicy['approvalType'].toUpperCase() === "ANYONE" || result.currentPolicy['approvalType'].toUpperCase() === "EVERYONE") {
					// 	result.leave = this.verticalLevel([result.leave, approverUserId, isApprove, result.currentPolicy['approvalLevel'], statusApprove]);
					// } else {
					// 	result.leave = this.horizontalLevel([result.leave, approverUserId, isApprove, statusApprove]);
					// }

					// result.leave.UPDATE_USER_GUID = approverUserId;
					// result.leave.REMARKS = leaveTransactionReason;

					// const resource = new Resource(new Array());

					// resource.resource.push(result.leave);

					// return this.leaveTransactionService.updateByModel(resource, [], [], [])
					// 	.pipe(map(res => {
					// 		if (res.status != 200) {
					// 			throw "Fail to Update Leave Transaction";
					// 		}

					// 		return res.data.resource;
					// 	}))
					return this.setupDataApproval([result, approverUserId, isApprove, statusApprove, leaveTransactionReason]);
				}), mergeMap(res => {
					return res;
				})
			)

	}

	/**
	 * Setup data approval
	 *
	 * @private
	 * @param {[any, string, boolean, string, string]} [result, approverUserId, isApprove, statusApprove, leaveTransactionReason]
	 * @returns
	 * @memberof ApprovalService
	 */
	private setupDataApproval([result, approverUserId, isApprove, statusApprove, leaveTransactionReason]: [any, string, boolean, string, string]) {
		if (result.currentPolicy['approvalType'].toUpperCase() === "ANYONE" || result.currentPolicy['approvalType'].toUpperCase() === "EVERYONE") {
			result.leave = this.verticalLevel([result.leave, approverUserId, isApprove, result.currentPolicy['approvalLevel'], statusApprove]);
		} else {
			result.leave = this.horizontalLevel([result.leave, approverUserId, isApprove, statusApprove]);
		}

		result.leave.UPDATE_USER_GUID = approverUserId;
		// result.leave.REMARKS = leaveTransactionReason;

		const resource = new Resource(new Array());

		resource.resource.push(result.leave);
		// console.log(resource);

		return this.leaveTransactionService.updateByModel(resource, [], [], [])
			.pipe(map(res => {
				if (res.status != 200) {
					throw "Fail to Update Leave Transaction";
				}
				else {
					console.log(resource.resource[0].LEAVE_TRANSACTION_GUID);
					const data = resource.resource[0];
					const leaveTransactionId = data.LEAVE_TRANSACTION_GUID as string;
					const statusProcess = data.STATUS as string;

					this.leaveTransactionLogDbService.create([leaveTransactionId, statusProcess, 'APPROVAL', leaveTransactionReason, approverUserId, data.TENANT_GUID]).subscribe(
						data => { console.log(data); }, err => { console.log(err); }
					);
				}

				return res.data.resource;
			}))
	}

	/**
	 * Check leave data
	 *
	 * @private
	 * @param {[LeaveTransactionModel[]]} [leaveDetail]
	 * @returns
	 * @memberof ApprovalService
	 */
	private findLeaveData([leaveDetail]: [LeaveTransactionModel[]]) {
		if (leaveDetail.length == 0) {
			throw "Leave detail not found";
		}

		const leave = leaveDetail[0];

		if (leave.STATUS !== "PENDING") {
			throw "Invalid Leave";
		}
		return leave;
	}

	/**
	 * Validate leave status
	 *
	 * @private
	 * @param {[any, string, any]} [resDatatemp, approverUserId, result]
	 * @memberof ApprovalService
	 */
	private validateLeaveStatus([resDatatemp, approverUserId, result]: [any, string, any]) {
		if (!resDatatemp.includes(approverUserId)) {
			throw "Approval process not valid"; // User is not his/her manager
		} else {
			// Check current approval level
			if (result.leave.STATES != null && result.leave.STATES != '') {
				const currentStates = JSON.parse(result.leave.STATES);
				const approveMngId = currentStates.filter(x => x.userId === approverUserId);
				// check if manager already approve
				if (approveMngId.length > 0)
					throw "You already approve this employee";
			}
		}
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
	private verticalLevel([leave, approverUserId, isApprove, currentPolicyLevel, statusApprove]: [LeaveTransactionModel, string, boolean, number, string]) {
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
			if (statusApprove == 'cancel') {
				leave.STATUS = "CANCEL";
				leave.CURRENT_APPROVAL_LEVEL = null;
				leave.STATES = null;
			}

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
	// private horizontalLevel(leave: LeaveTransactionModel, approverUserId: string, isApprove: boolean) {

	private horizontalLevel([leave, approverUserId, isApprove, statusApprove]: [LeaveTransactionModel, string, boolean, string]) {
		// only 1 level vertically
		leave.CURRENT_APPROVAL_LEVEL = 1;

		leave.STATES = JSON.stringify(new Array<STATESDTO>(new STATESDTO(leave.CURRENT_APPROVAL_LEVEL, approverUserId)));

		if (isApprove) {
			leave.STATUS = "APPROVED";
		} else {
			leave.STATUS = "REJECTED";
			if (statusApprove == 'cancel') {
				leave.STATUS = "CANCEL";
				leave.CURRENT_APPROVAL_LEVEL = 0;
				leave.STATES = null;
			}

		}

		return leave;
	}


}