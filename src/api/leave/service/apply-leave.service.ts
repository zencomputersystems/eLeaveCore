import { Injectable } from '@nestjs/common';
import { Moment } from 'moment';
import { ApplyLeaveDTO } from '../dto/apply-leave.dto';
import { UserLeaveEntitlementDbService } from 'src/api/userprofile/db/user-leave-entitlement.db.service';
import { map, filter, switchMap, mergeMap } from 'rxjs/operators';
import { UserLeaveEntitlementModel } from 'src/api/userprofile/model/user-leave-entitlement.model';
import { LeaveApplicationValidationService } from 'src/common/policy/leave-application-validation/services/leave-application-validation.service';
import { UserInfoService } from 'src/admin/user-info/user-info.service';
import { UserInfoModel } from 'src/admin/user-info/model/user-info.model';
import moment = require('moment');
import { of, pipe, Observable } from 'rxjs';
import { LeaveBalanceValidationService } from 'src/common/policy/leave-application-validation/services/leave-balance-validation.service';
import { LeaveTransactionModel } from '../model/leave-transaction.model';
import { v1 } from 'uuid';
import { Resource } from 'src/common/model/resource.model';
import { LeaveTransactionDbService } from '../db/leave-transaction.db.service';
import { DateCalculationService } from 'src/common/calculation/service/date-calculation.service';
import { LeaveTypePropertiesXmlDTO } from 'src/admin/leavetype-entitlement/dto/xml/leavetype-properties.xml.dto';
import { ValidationStatusDTO } from 'src/common/policy/leave-application-validation/dto/validation-status.dto';
import { json } from 'body-parser';
import { ApplyLeaveDataDTO } from '../dto/apply-leave-data.dto';
import { setTimeout } from 'timers';
import { GeneralLeavePolicyService } from '../../../admin/general-leave-policy/general-leave-policy.service';
import { LeavetypeEntitlementDbService } from 'src/admin/leavetype-entitlement/db/leavetype-entitlement.db.service';
import { runServiceCallback } from 'src/common/helper/basic-functions';
/** XMLparser from zen library  */
var { convertXMLToJson, convertJsonToXML } = require('@zencloudservices/xmlparser');

/**
 * Service for apply leave
 *
 * @export
 * @class ApplyLeaveService
 */
@Injectable()
export class ApplyLeaveService {

	/**
	 *Creates an instance of ApplyLeaveService.
	 * @param {UserLeaveEntitlementDbService} userLeaveEntitlementDbService
	 * @param {LeaveApplicationValidationService} leaveValidationService
	 * @param {UserInfoService} userInfoService
	 * @param {LeaveTransactionDbService} leaveTransactionDbService
	 * @param {DateCalculationService} dateCalculationService
	 * @memberof ApplyLeaveService
	 */
	constructor(
		private readonly userLeaveEntitlementDbService: UserLeaveEntitlementDbService,
		private readonly leaveValidationService: LeaveApplicationValidationService,
		private readonly userInfoService: UserInfoService,
		private readonly leaveTransactionDbService: LeaveTransactionDbService,
		private readonly dateCalculationService: DateCalculationService,
		private readonly generalLeavePolicyService: GeneralLeavePolicyService,
		private readonly leavetypeEntitlementDbService: LeavetypeEntitlementDbService
	) { }

	/**
	 * Process apply leave on behalf
	 *
	 * @param {ApplyLeaveDTO} applyLeaveDTO
	 * @param {*} user
	 * @param {*} userguidOnApply
	 * @param {*} filter
	 * @returns
	 * @memberof ApplyLeaveService
	 */
	public async processLeaveOnBehalf([applyLeaveDTO, user, userguidOnApply, filter]: [ApplyLeaveDTO, any, any, any]): Promise<any> {

		// Declare result status for each user
		let resultArr = [];

		// Loop one by one staff
		for (var i = 0; i < userguidOnApply.length; i++) {

			// Query by user guid
			let userguid = userguidOnApply[i];
			let extension = ['(USER_GUID=' + userguid + ')'];

			// Apply leave process
			const applyOnBehalfProcess = () => {
				return new Promise((resolve, reject) => {
					this.applyLeaveProcess([applyLeaveDTO, user, extension, true]).subscribe(
						data => { resolve(data); },
						err => { return reject(err); }
					);
				});
			}

			// Group status user one by one
			resultArr.push(await applyOnBehalfProcess());
		}

		return await resultArr;
	}

	/**
	 * process leave application
	 *
	 * @param {ApplyLeaveDTO} applyLeaveDTO
	 * @param {*} user
	 * @returns
	 * @memberof ApplyLeaveService
	 */
	public processLeave(applyLeaveDTO: ApplyLeaveDTO, user: any) {
		let extension = ['(USER_GUID=' + user.USER_GUID + ')', '(TENANT_GUID=' + user.TENANT_GUID + ')'];
		return this.applyLeaveProcess([applyLeaveDTO, user, extension, null]);
	}

	/**
	 * Process apply leave
	 *
	 * @private
	 * @param {ApplyLeaveDTO} applyLeaveDTO
	 * @param {*} user
	 * @param {*} extensionQuery
	 * @param {boolean} onbehalf
	 * @returns
	 * @memberof ApplyLeaveService
	 */
	private applyLeaveProcess([applyLeaveDTO, user, extensionQuery, onbehalf]: [ApplyLeaveDTO, any, any, boolean]) {
		let y = applyLeaveDTO;

		return this.userInfoService.findByFilterV2(['JOIN_DATE', 'CONFIRMATION_DATE', 'USER_GUID', 'TENANT_GUID', 'TENANT_COMPANY_GUID'], extensionQuery)
			.pipe(
				map(res => {
					return res[0];
				}),
				mergeMap((userInfo: UserInfoModel) => {
					return this.checkUserLeaveEntitlement(y.leaveTypeID, userInfo)
						.pipe(
							map((userEntitlement: UserLeaveEntitlementModel[]) => {
								return { userInfo, userEntitlement };
							})
						)
				}),
				mergeMap(async (result) => {
					// find the parent leave
					const parent = result.userEntitlement.filter(x => x.PARENT_FLAG == 1)[0];
					// console.log(parent);
					let method = this.leavetypeEntitlementDbService.findByFilterV2(['PROPERTIES_XML'], [`(ENTITLEMENT_GUID=${parent.ENTITLEMENT_GUID})`]);

					// call leavetype entitlement def (before this read from xml snapshot)
					let restemp = runServiceCallback(method).then(
						result1 => {
							// console.log(result1);
							// console.log(restemp);
							// console.log('siapa dulu?');


							// if (parent.PROPERTIES_XML == null || parent.PROPERTIES_XML == undefined) {
							if (result1[0].PROPERTIES_XML == null || result1[0].PROPERTIES_XML == undefined) {
								const res = new ValidationStatusDTO();
								res.valid = false;
								res.message.push("Policy Not Found");
								throw res;
							}

							const policy: LeaveTypePropertiesXmlDTO = convertXMLToJson(result1[0].PROPERTIES_XML);
							const validation = this.leaveValidationService.validateLeave([policy, y, result.userInfo, result.userEntitlement]);

							return validation.pipe(map((validationResult) => {
								validationResult.userId = result.userInfo.USER_GUID;
								return { result, validationResult, policy };
							}));
						}
					);
					return await restemp;

					// console.log(restemp);
					// console.log('siapa dulu?');

					// if (parent.PROPERTIES_XML == null || parent.PROPERTIES_XML == undefined) {
					// 	const res = new ValidationStatusDTO();
					// 	res.valid = false;
					// 	res.message.push("Policy Not Found");
					// 	throw res;
					// }

					// const policy: LeaveTypePropertiesXmlDTO = convertXMLToJson(parent.PROPERTIES_XML);
					// const validation = this.leaveValidationService.validateLeave([policy, y, result.userInfo, result.userEntitlement]);

					// return validation.pipe(map((validationResult) => {
					// 	validationResult.userId = result.userInfo.USER_GUID;
					// 	return { result, validationResult, policy };
					// }));
				}), mergeMap(res => {
					return res;
				}), mergeMap(res => {
					let { result, validationResult, policy } = res;
					return this.generalLeavePolicyService.findByFilterV2([], ['(TENANT_COMPANY_GUID=' + result.userInfo.TENANT_COMPANY_GUID + ')']).pipe(map((generalPolicyData) => {
						result['generalLeavePolicy'] = generalPolicyData;
						return { result, validationResult, policy };
					}));
					// return { result, validationResult, policy };
				}),
				mergeMap(result => {
					if (result.validationResult.valid) {
						return of(this.applyLeaveData([result, y, user, onbehalf]));
					} else {
						return of(result.validationResult);
					}
				})
			)
	}

	/**
	 * Process apply leave data
	 *
	 * @private
	 * @param {[any, ApplyLeaveDTO, any, boolean]} [result, y, user, onbehalf]
	 * @returns
	 * @memberof ApplyLeaveService
	 */
	private applyLeaveData([result, y, user, onbehalf]: [any, ApplyLeaveDTO, any, boolean]) {
		let resArr = [];
		let sumDays = 0;
		for (let i = 0; i < y.data.length; i++) {
			let leaveDetail = y.data[i];

			let msjStatus = "";
			let noOfDays = this.dateCalculationService.getLeaveDuration([y.data[i].startDate, y.data[i].endDate, y.data[i].dayType, result.policy.excludeDayType.isExcludeHoliday, result.policy.excludeDayType.isExcludeRestDay]);

			if (noOfDays == 0) {
				msjStatus = leaveDetail.startDate + ' is a leave day';
			}
			else {
				msjStatus = noOfDays + ' ' + (noOfDays > 1 ? 'days' : 'day') + '  was send for approval between ' + leaveDetail.startDate + ' and ' + leaveDetail.endDate;
				this.leaveTransactionDbService.create([y.data[i], result, user, y, onbehalf]).pipe(map((res) => {
					if (res.status != 200) {
						result.validationResult.valid = false;
					}

					return result.validationResult;
				})).subscribe(data => {

				})
			}
			resArr.push(msjStatus);
			sumDays = sumDays + noOfDays;
		}
		result.validationResult.message = sumDays + ' ' + (sumDays > 1 ? 'days' : 'day') + ' was send for approval';
		result.validationResult.details = resArr;
		return result.validationResult;
	}

	/**
	 * Method check user leave entitlement 
	 * check if leave entitlement policy is available
	 *
	 * @private
	 * @param {string} leaveTypeId
	 * @param {*} user
	 * @returns
	 * @memberof ApplyLeaveService
	 */
	private checkUserLeaveEntitlement(leaveTypeId: string, user: any) {

		const filter = [
			'(LEAVE_TYPE_GUID=' + leaveTypeId + ')',
			'(USER_GUID=' + user.USER_GUID + ')',
			'(TENANT_GUID=' + user.TENANT_GUID + ')',
			'(ACTIVE_FLAG=1)',
			'(YEAR=' + new Date().getFullYear() + ')'
		];

		return this.userLeaveEntitlementDbService.findByFilterV2([], filter)
			.pipe(
				map(result => {
					if (result.length == 0) {
						const res = new ValidationStatusDTO();
						res.valid = false;
						res.message.push("Leave Entitlement Not Available");
						throw res;
					}
					return result;
				})
			)
	}

	/**
	 * Method get month
	 * 
	 * get month between 2 date
	 * return array of month
	 *
	 * @param {Moment} startDate
	 * @param {Moment} endDate
	 * @returns
	 * @memberof ApplyLeaveService
	 */
	getMonths(startDate: Moment, endDate: Moment) {
		var timeValues = [];

		while (endDate > startDate || startDate.format('M') === endDate.format('M')) {
			timeValues.push(startDate.format('YYYY-MM'));
			startDate.add(1, 'month');
		}

		return timeValues;
	}

	/**
	 * Method get days between two dates
	 * 
	 * get day list between 2 date
	 *
	 * @param {Moment} startDate
	 * @param {Moment} endDate
	 * @returns
	 * @memberof ApplyLeaveService
	 */
	getDays(startDate: Moment, endDate: Moment) {
		var timeValues = [];

		while (endDate > startDate || startDate.format('D') === endDate.format('D')) {
			timeValues.push(startDate.format('YYYY-MM-DD'));
			startDate.add(1, 'day');
		}

		return timeValues;
	}
}