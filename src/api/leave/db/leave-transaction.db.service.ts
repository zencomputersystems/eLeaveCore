import { BaseDBService } from 'src/common/base/base-db.service';
import { IDbService } from 'src/interface/IDbService';
import { Injectable, HttpService } from '@nestjs/common';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { LeaveTransactionModel } from '../model/leave-transaction.model';
import { v1 } from 'uuid';
import { ApplyLeaveDataDTO } from '../dto/apply-leave-data.dto';
import { ApplyLeaveDTO } from '../dto/apply-leave.dto';
import { Resource } from 'src/common/model/resource.model';
import { DateCalculationService } from 'src/common/calculation/service/date-calculation.service';
import { UpdateApprovalDTO } from 'src/admin/approval-override/dto/update-approval.dto';
import moment = require('moment');
/** XMLparser from zen library  */
var { convertJsonToXML } = require('@zencloudservices/xmlparser');

type CreateLeave = [ApplyLeaveDataDTO, any, any, ApplyLeaveDTO, boolean];
/**
 * DB Service for leave transaction
 *
 * @export
 * @class LeaveTransactionDbService
 * @extends {BaseDBService}
 * @implements {IDbService}
 */
@Injectable()
export class LeaveTransactionDbService extends BaseDBService implements IDbService {

	/**
	 *Creates an instance of LeaveTransactionDbService.
	 * @param {HttpService} httpService Service for http
	 * @param {DateCalculationService} dateCalculationService Service for date calculation
	 * @param {QueryParserService} queryService Service for query
	 * @memberof LeaveTransactionDbService
	 */
	constructor(
		public readonly httpService: HttpService,
		private readonly dateCalculationService: DateCalculationService,
		public readonly queryService: QueryParserService) {
		super(httpService, queryService, "l_main_leave_transaction");
	}

	/**
	 * Get all pending leave status
	 *
	 * @param {string} tenantId
	 * @returns
	 * @memberof LeaveTransactionDbService
	 */
	public findAll(tenantId: string) {
		const fields = [];
		let lastWeek = moment().subtract(1, 'weeks').format('YYYY-MM-DD');
		const filters = ['(TENANT_GUID=' + tenantId + ')', '((START_DATE > ' + lastWeek + ') OR (STATUS=PENDING))'];
		const url = this.queryService.generateDbQueryV2('l_main_leave_transaction', fields, filters, []);
		return this.httpService.get(url);
	}

	/**
	 * Find own leave transaction for this year
	 *
	 * @param {string} userId
	 * @returns
	 * @memberof LeaveTransactionDbService
	 */
	public findOwn(userId: string) {
		// const filters = ['(USER_GUID=' + userId + ')', '(CREATION_TS> ' + new Date().getFullYear() + '-01-01)'];
		const filters = ['(USER_GUID=' + userId + ')', '(START_DATE >= ' + new Date().getFullYear() + '-01-01)'];
		const url = this.queryService.generateDbQueryV2('l_main_leave_transaction', [], filters, []);
		return this.httpService.get(url);
	}

	/**
	 * Find all pending leave
	 *
	 * @param {string} userGuid
	 * @returns
	 * @memberof LeaveTransactionDbService
	 */
	public findAllPendingLeave(userGuid: string) {
		let dateLastMonth = moment().subtract(1, 'months').format('YYYY-MM-DD');
		const fields = [];
		const filters = ['(USER_GUID IN (' + userGuid + '))', '(START_DATE >= ' + dateLastMonth + ')', '(ENTITLEMENT_GUID != "Anniversary Policy")'];
		const url = this.queryService.generateDbQueryV2('l_main_leave_transaction', fields, filters, []);
		return this.httpService.get(url);
	}


	/**
	 * Find long leave
	 *
	 * @param {string[]} filters
	 * @returns
	 * @memberof LeaveTransactionDbService
	 */
	public findLongLeave(filters: string[]) {
		const fields = [];
		const url = this.queryService.generateDbQueryV2('l_main_leave_transaction', fields, filters, []);
		return this.httpService.get(url);
	}

	/**
	 * Update to employee for approval override
	 *
	 * @param {*} user
	 * @param {UpdateApprovalDTO} d
	 * @returns
	 * @memberof LeaveTransactionDbService
	 */
	public updateToEmployee(user: any, d: UpdateApprovalDTO) {
		// console.log(user);
		const resource = new Resource(new Array);
		const data = new LeaveTransactionModel;

		data.STATUS = d.status;
		data.UPDATE_TS = new Date().toISOString();
		data.UPDATE_USER_GUID = user.USER_GUID;
		data.REMARKS = d.remark;
		let leaveList = '';
		for (let i = 0; i < d.leaveTransactionId.length; i++) {
			if (leaveList == '') {
				leaveList = '"' + d.leaveTransactionId[i] + '"';
			} else {
				leaveList = leaveList + ',"' + d.leaveTransactionId[i] + '"';
			}
		}

		resource.resource.push(data);
		// console.log(resource);

		return this.updateByModel(resource, ['USER_GUID', 'LEAVE_TRANSACTION_GUID', 'STATUS'], ['(LEAVE_TRANSACTION_GUID IN (' + leaveList + '))'], []);
	}
	/**
	 * Create new leave transaction 
	 *
	 * @param {ApplyLeaveDataDTO} applyLeaveDataDTO
	 * @param {*} result
	 * @param {*} user
	 * @param {ApplyLeaveDTO} y
	 * @returns
	 * @memberof LeaveTransactionDbService
	 */
	public create(data: CreateLeave) {
		let applyLeaveDataDTO: ApplyLeaveDataDTO = data[0];
		let result: any = data[1];
		let user: any = data[2];
		let y: ApplyLeaveDTO = data[3];
		let applyOnBehalf: boolean = data[4];
		// let applyOnBehalf = true;
		// const data = new LeaveTransactionModel();

		// data.LEAVE_TRANSACTION_GUID = v1();
		// data.CREATION_USER_GUID = user.USER_GUID;
		// data.USER_GUID = user.USER_GUID;
		// data.TENANT_GUID = user.TENANT_GUID;
		// data.ENTITLEMENT_GUID = applyLeaveDataDTO.leaveTypeID;
		// data.START_DATE = applyLeaveDTO.startDate;
		// data.END_DATE = applyLeaveDTO.endDate;

		let leaveData = new LeaveTransactionModel();

		leaveData.LEAVE_TRANSACTION_GUID = v1();
		leaveData.LEAVE_TYPE_GUID = result.result.userEntitlement[0].LEAVE_TYPE_GUID;
		leaveData.ENTITLEMENT_GUID = result.result.userEntitlement[0].ENTITLEMENT_GUID;

		// leaveData.USER_GUID = user.USER_GUID;
		// leaveData.TENANT_GUID = user.TENANT_GUID;
		let xmlData = {};
		xmlData['root'] = {};
		xmlData['root']['generalLeavePolicy'] = result.result.generalLeavePolicy[0].PROPERTIES_XML;
		xmlData['root']['entitlementPolicy'] = result.policy;

		// console.log(result.result.generalLeavePolicy[0]);

		leaveData.USER_GUID = result.result.userInfo.USER_GUID;
		leaveData.TENANT_GUID = result.result.userInfo.TENANT_GUID;
		leaveData.CREATION_USER_GUID = user.USER_GUID;
		leaveData.TENANT_COMPANY_GUID = result.result.userInfo.TENANT_COMPANY_GUID == undefined ? "" : result.result.userInfo.TENANT_COMPANY_GUID;
		leaveData.START_DATE = applyLeaveDataDTO.startDate;
		leaveData.END_DATE = applyLeaveDataDTO.endDate;
		leaveData.REASON = y.reason;
		leaveData.ATTACHMENT = y.attachment;
		leaveData.NO_OF_DAYS = this.dateCalculationService.getLeaveDuration([applyLeaveDataDTO.startDate, applyLeaveDataDTO.endDate, applyLeaveDataDTO.dayType, result.policy.excludeDayType.isExcludeHoliday, result.policy.excludeDayType.isExcludeRestDay]);
		// leaveData.ENTITLEMENT_XML_SNAPSHOT = convertJsonToXML(result.policy);
		leaveData.ENTITLEMENT_XML_SNAPSHOT = convertJsonToXML(xmlData);
		leaveData.ACTIVE_FLAG = true;
		leaveData.STATES = null;
		leaveData.STATUS = "PENDING";
		leaveData.UPDATE_USER_GUID = user.USER_GUID;

		if (applyLeaveDataDTO.dayType == 1) // if half day
			leaveData.TIME_SLOT = applyLeaveDataDTO.slot || null;
		if (applyLeaveDataDTO.dayType == 2) // if quarter day
			leaveData.TIME_SLOT = applyLeaveDataDTO.quarterDay || null;

		leaveData.CURRENT_APPROVAL_LEVEL = 0;
		// leaveData.Half_Date = applyLeaveDataDTO.dayType == 1 ? applyLeaveDataDTO.startDate : null;
		leaveData.APPLIED_ON_BEHALF = applyOnBehalf;
		// leaveData.Is_Half_Day = applyLeaveDataDTO.slot != "" ? true : null;


		let resource = new Resource(new Array());

		console.log(leaveData);

		resource.resource.push(leaveData);

		return this.createByModel(resource, ['*'], [], []);
	}

}