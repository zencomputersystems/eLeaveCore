import { Injectable } from '@nestjs/common';
import { Observable, of, pipe } from 'rxjs';
import { map, mergeMap, filter, flatMap } from 'rxjs/operators';
import { LeaveTransactionDbService } from 'src/api/leave/db/leave-transaction.db.service';
import { LeaveTransactionModel } from 'src/api/leave/model/leave-transaction.model';
import { STATESDTO } from '../dto/states.dto';
import { Resource } from 'src/common/model/resource.model';
import { UserprofileDbService } from '../../../api/userprofile/db/userprofile.db.service';
import { ApprovedLeaveDTO } from 'src/api/leave/dto/approved-leave.dto';
import { LeaveTransactionLogDbService } from '../../../api/leave/db/leave-transaction-log.db.service';
import { EmailNodemailerService } from '../../helper/email-nodemailer.service';
import { runServiceCallback } from 'src/common/helper/basic-functions';
import moment = require('moment');
import { LeavetypeService } from 'src/admin/leavetype/leavetype.service';
import { ApprovalOverrideService } from 'src/admin/approval-override/approval-override.service';
import { WorkingHoursDbService } from '../../../admin/working-hours/db/working-hours.db.service';
/** XMLparser from zen library  */
var { convertXMLToJson } = require('@zencloudservices/xmlparser');

/** 
 * Superior approve leave (send email at notification rule email)
 * Superior approve, reject, cancel leave (user get email leave status)
 * User cancel leave (superior get email leave cancel)
 */

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
		public leaveTransactionService: LeaveTransactionDbService,
		public userprofileDbService: UserprofileDbService,
		public leaveTransactionLogDbService: LeaveTransactionLogDbService,
		public emailNodemailerService: EmailNodemailerService,
		public leavetypeService: LeavetypeService,
		public workingHoursDbService: WorkingHoursDbService
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
		// Check current policy whether anyone or everyone
		if (result.currentPolicy['approvalType'].toUpperCase() === "ANYONE" || result.currentPolicy['approvalType'].toUpperCase() === "EVERYONE") {
			result.leave = this.verticalLevel([result.leave, approverUserId, isApprove, result.currentPolicy['approvalLevel'], statusApprove]);
		} else {
			result.leave = this.horizontalLevel([result.leave, approverUserId, isApprove, statusApprove]);
		}

		result.leave.UPDATE_USER_GUID = approverUserId;
		// result.leave.REMARKS = leaveTransactionReason;

		const resource = new Resource(new Array());

		resource.resource.push(result.leave);

		return this.leaveTransactionService.updateByModel(resource, [], [], ['LEAVE_TRANSACTION_GUID', 'LEAVE_TYPE_GUID', 'START_DATE', 'END_DATE', 'TIME_SLOT'])
			.pipe(map(res => {
				if (res.status != 200) {
					throw "Fail to Update Leave Transaction";
				}
				else {
					const data = resource.resource[0];
					const leaveTransactionId = data.LEAVE_TRANSACTION_GUID as string;
					const statusProcess = data.STATUS as string;
					let leaveTransaction = res.data.resource[0];
					let applierData;
					let approverData;
					let managerData;
					let workingHoursData;
					this.leaveTransactionLogDbService.create([leaveTransactionId, statusProcess, 'APPROVAL', leaveTransactionReason, approverUserId, data.TENANT_GUID]).subscribe(
						data2 => {

							// if (result.leave.USER_GUID != approverUserId)
							// approverUserId = result.leave.USER_GUID;

							let userData = approverUserId + ',' + result.leave.USER_GUID;

							// this.userprofileDbService.findByFilterV2([], [`(USER_GUID=${approverUserId})`]).pipe(
							this.userprofileDbService.findByFilterV2([], [`(USER_GUID IN (${userData}))`]).pipe(
								mergeMap(async res2 => {

									applierData = res2.find(x => x.USER_GUID === result.leave.USER_GUID);
									approverData = res2.find(x => x.USER_GUID === approverUserId);

									let leavetypeData = await runServiceCallback(this.leavetypeService.findByFilterV2([], [`(LEAVE_TYPE_GUID=${leaveTransaction.LEAVE_TYPE_GUID})`])) as any[];

									let workingHoursMethod = this.workingHoursDbService.findByFilterV2([], [`(WORKING_HOURS_GUID=${applierData.WORKING_HOURS_GUID})`]).pipe(
										map(res => { return res[0]; })
									)

									workingHoursData = await runServiceCallback(workingHoursMethod);

									managerData = res2.find(x => x.USER_GUID === applierData.MANAGER_USER_GUID);

									if (res2.length == 1)
										managerData = await runServiceCallback(this.userprofileDbService.findByFilterV2([], [`(USER_GUID IN (${applierData.MANAGER_USER_GUID}))`]).pipe(map(res => { return res[0]; })))

									return { res2, leavetypeData, managerData };
								})
							).subscribe(
								data1 => {
									let { res2, leavetypeData, managerData } = data1;
									workingHoursData = convertXMLToJson(workingHoursData.PROPERTIES_XML);

									workingHoursData = workingHoursData.property;
									let timeDetails = leaveTransaction.TIME_SLOT == 'AM' ? workingHoursData.halfday.AM :
										leaveTransaction.TIME_SLOT == 'PM' ? workingHoursData.halfday.PM :
											leaveTransaction.TIME_SLOT == 'Q1' ? workingHoursData.quarterday.Q1 :
												leaveTransaction.TIME_SLOT == 'Q2' ? workingHoursData.quarterday.Q2 :
													leaveTransaction.TIME_SLOT == 'Q3' ? workingHoursData.quarterday.Q3 :
														leaveTransaction.TIME_SLOT == 'Q4' ? workingHoursData.quarterday.PQ4 :
															workingHoursData.fullday;

									if (statusProcess == 'APPROVED') {
										this.setupEmailApprove([leaveTransaction, data, applierData, managerData, timeDetails, leavetypeData, leaveTransactionReason]);
									} else if (statusProcess == 'CANCELLED' || statusProcess == 'REJECTED') {
										this.setupEmailCancel([res2, leavetypeData, leaveTransaction, managerData, leaveTransactionReason, data, approverData, timeDetails]);
									}
								},
								err => { }
							)

						}, err => {

						}
					);
				}

				return res.data.resource;
			}))
	}

	/**
	 * Send email if approve leave
	 * 1- To user
	 * 2- To notifier
	 *
	 * @param {*} [leaveTransaction, data, res2]
	 * @memberof ApprovalService
	 */
	public setupEmailApprove([leaveTransaction, data, applierData, managerData, timeDetails, leavetypeData, leaveTransactionReason]) {

		leaveTransaction.START_DATE = leaveTransaction.START_DATE + timeDetails.start_time;
		leaveTransaction.END_DATE = leaveTransaction.END_DATE + timeDetails.end_time;

		// Send email to applier with ics file
		let contentCal = 'BEGIN:VCALENDAR\n' +
			'VERSION:2.0\n' +
			'BEGIN:VEVENT\n' +
			'SUMMARY:On Leave\n' +
			'DTSTART;VALUE=DATE:' + moment(leaveTransaction.START_DATE, 'YYYY-MM-DDHH:mm').format('YYYYMMDDTHHmmss') + '\n' +
			'DTEND;VALUE=DATE:' + moment(leaveTransaction.END_DATE, 'YYYY-MM-DDHH:mm').format('YYYYMMDDTHHmmss') + '\n' +
			'DESCRIPTION:' + data.REASON + '\n' +
			'STATUS:CONFIRMED\n' +
			'SEQUENCE:3\n' +
			'BEGIN:VALARM\n' +
			'TRIGGER:-PT10M\n' +
			'ACTION:DISPLAY\n' +
			'END:VALARM\n' +
			'END:VEVENT\n' +
			'END:VCALENDAR';

		let userName = managerData.FULLNAME;
		let leaveType = leavetypeData[0].CODE;
		let reason = data.REASON;
		let remark = leaveTransactionReason;
		let message = `Start Date: ${moment(leaveTransaction.START_DATE, 'YYYY-MM-DDHH:mm').format('DD/MM/YYYY HH:mm')} </br>
		End Date: ${moment(leaveTransaction.END_DATE, 'YYYY-MM-DDHH:mm').format('DD/MM/YYYY HH:mm')}</br>
		Duration: ${leaveTransaction.TIME_SLOT == null ? 'Full Day' : leaveTransaction.TIME_SLOT == 'AM' || leaveTransaction.TIME_SLOT == 'PM' ? 'Half Day - ' + leaveTransaction.TIME_SLOT : 'Quarter Day - ' + leaveTransaction.TIME_SLOT}</br>`;

		this.emailNodemailerService.mailProcessAppproveStatus([applierData.EMAIL, managerData.FULLNAME, data.STATUS, message, contentCal, userName, leaveType, reason, remark]);

		// Send email to email set in notification rule
		let user, tempData;
		tempData = applierData;
		let messageToNotifier = `on ${moment(leaveTransaction.START_DATE, 'YYYY-MM-DDHH:mm').format('DD/MM/YYYY HH:mm')} to ${moment(leaveTransaction.END_DATE, 'YYYY-MM-DDHH:mm').format('DD/MM/YYYY HH:mm')}`
		this.sendEmailToNotifier([user, tempData, leaveType, messageToNotifier]);
	}

	/**
	 * Send email leave status cancel and reject
	 *
	 * @param {*} [res2, leavetypeData, leaveTransaction, managerData, leaveTransactionReason, data]
	 * @memberof ApprovalService
	 */
	public setupEmailCancel([res2, leavetypeData, leaveTransaction, managerData, leaveTransactionReason, data, approverData, timeDetails]) {

		leaveTransaction.START_DATE = leaveTransaction.START_DATE + timeDetails.start_time;
		leaveTransaction.END_DATE = leaveTransaction.END_DATE + timeDetails.end_time;

		let email = res2[0].EMAIL;

		if (data.USER_GUID == res2[0].USER_GUID && data.STATUS == 'CANCELLED')
			email = managerData.EMAIL + ',' + res2[0].EMAIL;

		let leaveType = leavetypeData[0].CODE;
		let reasonLeave = data.REASON;
		let staffId = res2[0].STAFF_ID;
		let name = approverData.FULLNAME + ` (Staff ID : ${approverData.STAFF_ID})`;
		let message = `Start Date: ${moment(leaveTransaction.START_DATE, 'YYYY-MM-DDHH:mm').format('DD/MM/YYYY HH:mm')} </br>
End Date: ${moment(leaveTransaction.END_DATE, 'YYYY-MM-DDHH:mm').format('DD/MM/YYYY HH:mm')}</br>
Duration: ${leaveTransaction.TIME_SLOT == null ? 'Full Day' : leaveTransaction.TIME_SLOT == 'AM' || leaveTransaction.TIME_SLOT == 'PM' ? 'Half Day - ' + leaveTransaction.TIME_SLOT : 'Quarter Day - ' + leaveTransaction.TIME_SLOT}</br>`;
		let approverName;
		approverName = managerData.FULLNAME ? managerData.FULLNAME : 'N/A';

		let remarks = leaveTransactionReason;
		let leaveStatus = data.STATUS;

		this.emailNodemailerService.mailProcessCancelStatus([email, approverName, leaveStatus, message, leaveType, reasonLeave, name, staffId, remarks]);
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

		// if (leave.STATUS !== "PENDING") {
		// 	throw "Invalid Leave";
		// }
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
			if (statusApprove == 'cancelled') {
				leave.STATUS = "CANCELLED";
				// leave.CURRENT_APPROVAL_LEVEL = null;
				// leave.STATES = null;
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
			if (statusApprove == 'cancelled') {
				leave.STATUS = "CANCELLED";
				// leave.CURRENT_APPROVAL_LEVEL = 0;
				// leave.STATES = null;
			}

		}

		return leave;
	}


	/**
	 * Notification Rule
	 * Send email to email available
	 *
	 * @param {*} user
	 * @param {*} tempData
	 * @memberof ApprovalOverrideService
	 */
	public sendEmailToNotifier([user, tempData, leavetype, message]) {
		if (tempData.PROPERTIES_XML != null && tempData.PROPERTIES_XML != '' && tempData.PROPERTIES_XML != undefined) {
			let dataObj = convertXMLToJson(tempData.PROPERTIES_XML);
			if (dataObj.root.notificationRule) {
				this.sendEmailNotify([user, dataObj.root.notificationRule, tempData.FULLNAME, leavetype, message]);
			}
		}
	}

	/**
	 * Notification Rule
	 * Method to send email notify
	 *
	 * @param {*} user
	 * @param {string[]} userId
	 * @returns {Observable<any>}
	 * @memberof ApprovalOverrideService
	 */
	public sendEmailNotify([user, userId, fullname, leavetype, message]: [any, string[], string, string, string]): Observable<any> {
		let successList = [];
		let failedList = [];
		successList = [userId];
		if (successList)
			successList.forEach(element => {
				this.sendEmailV2([element, fullname, leavetype, message]);
			});
		return of(successList);
	}

	/**
	 * Notification Rule
	 * Method to send email
	 * Setup email approve to email notification rule
	 *
	 * @private
	 * @param {string} email
	 * @param {string} token
	 * @returns
	 * @memberof ApprovalOverrideService
	 */
	private sendEmailV2([email, fullname, leavetype, message]: [string, string, string, string]) {
		let results = this.emailNodemailerService.mailProcessApprove([email, fullname, leavetype, message]);
		return results;
	}

}