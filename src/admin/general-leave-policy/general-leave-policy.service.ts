import { GeneralLeavePolicyModel } from './model/general-leave-policy.model';
import { CreateGeneralLeavePolicyDTO } from './dto/create-general-leave-policy.dto';
import { Resource } from 'src/common/model/resource.model';
import { v1 } from 'uuid';
import { HttpService, Injectable } from '@nestjs/common';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { BaseDBService } from 'src/common/base/base-db.service';
import { Observable, of } from 'rxjs';
import { UpdateGeneralLeavePolicyDTO } from './dto/update-general-leave-policy.dto';
import { map, mergeMap } from 'rxjs/operators';
import { findAllList, getListData } from 'src/common/helper/basic-functions';
import { LeaveTransactionModel } from '../../api/leave/model/leave-transaction.model';
import uuid = require('uuid');
/** XMLparser from zen library  */
var { convertJsonToXML, convertXMLToJson } = require('@zencloudservices/xmlparser');

/**
 * Service for general leave policy
 *
 * @export
 * @class GeneralLeavePolicyService
 * @extends {BaseDBService}
 */
@Injectable()
export class GeneralLeavePolicyService extends BaseDBService {

	/**
	 * Declare table name for general leave policy
	 *
	 * @private
	 * @memberof GeneralLeavePolicyService
	 */
	private _tableName = "l_main_general_policy";

	/**
	 *Creates an instance of GeneralLeavePolicyService.
	 * @param {HttpService} httpService http service
	 * @param {QueryParserService} queryService query service
	 * @memberof GeneralLeavePolicyService
	 */
	constructor(
		public readonly httpService: HttpService,
		public readonly queryService: QueryParserService) {
		super(httpService, queryService, "l_main_general_policy");
	}

	/**
	 * Get general leave policy
	 *
	 * @param {string} TENANT_GUID
	 * @returns {Observable<any>}
	 * @memberof GeneralLeavePolicyService
	 */
	public findAll(TENANT_GUID: string): Observable<any> {

		const fields = [];
		let result = findAllList([fields, TENANT_GUID, this.queryService, this.httpService, this._tableName]);

		return getListData(result);
	}

	/**
	 * Find general leave policy by company id
	 *
	 * @param {string} tenantId
	 * @param {string} companyGuid
	 * @returns {Observable<any>}
	 * @memberof GeneralLeavePolicyService
	 */
	public findOne(tenantId: string, companyGuid: string): Observable<any> {
		const fields = [];
		const filters = ['(TENANT_GUID=' + tenantId + ')', '(TENANT_COMPANY_GUID=' + companyGuid + ')'];

		//url
		const url = this.queryService.generateDbQueryV2(this._tableName, fields, filters, []);

		//call DF to validate the user
		let result = this.httpService.get(url);
		return result.pipe(map(res => {
			if (res.status == 200) {
				return res.data.resource[0];
			}
		}))


	}

	/**
	 * Create general leave policy
	 *
	 * @param {*} user
	 * @param {CreateGeneralLeavePolicyDTO} d
	 * @returns
	 * @memberof GeneralLeavePolicyService
	 */
	create(user: any, d: CreateGeneralLeavePolicyDTO) {
		const resource = new Resource(new Array);
		const modelData = new GeneralLeavePolicyModel();

		modelData.MAIN_GENERAL_POLICY_GUID = v1();
		modelData.TENANT_GUID = user.TENANT_GUID;
		modelData.TENANT_COMPANY_GUID = d.tenantCompanyId;
		modelData.PROPERTIES_XML = convertJsonToXML(d);
		modelData.CREATION_TS = new Date().toISOString();
		modelData.CREATION_USER_GUID = user.USER_GUID;
		modelData.UPDATE_TS = null;
		modelData.UPDATE_USER_GUID = null;
		modelData.DELETED_AT = null;

		resource.resource.push(modelData);

		return this.createByModel(resource, [], [], []);

	}

	/**
	 * Update general leave policy
	 *
	 * @param {*} user
	 * @param {UpdateGeneralLeavePolicyDTO} d
	 * @returns
	 * @memberof GeneralLeavePolicyService
	 */
	update(user: any, d: UpdateGeneralLeavePolicyDTO) {
		const resource = new Resource(new Array);
		const data = new GeneralLeavePolicyModel();

		data.MAIN_GENERAL_POLICY_GUID = d.generalPolicyId;
		data.PROPERTIES_XML = convertJsonToXML(d.data);
		data.UPDATE_TS = new Date().toISOString();
		data.UPDATE_USER_GUID = user.USER_GUID;

		resource.resource.push(data);

		return this.updateByModel(resource, [], [], []);
	}

	public syncPolicy([policyId]: [string]) {

		let dataPolicyRaw;
		return this.findByFilterV4([[], [`(MAIN_GENERAL_POLICY_GUID=${policyId})`], null, null]).pipe(
			mergeMap(res => {
				dataPolicyRaw = res[0];
				return this.httpService.get(this.queryService.generateDbQuery('l_view_user_profile_list', ['USER_GUID', 'DOB', 'JOIN_DATE', 'TENANT_COMPANY_GUID', 'EMAIL', 'ACTIVATION_FLAG', 'TENANT_GUID'], [`(TENANT_COMPANY_GUID=${res[0].TENANT_COMPANY_GUID})`]));
			}), mergeMap(res => {
				let userAttach = res.data.resource;
				const dataPolicy = convertXMLToJson(dataPolicyRaw.PROPERTIES_XML);

				this.processLeaveEntitlement([dataPolicy, userAttach]);
				return of(res.data.resource);
			})
		);
	}

	private processLeaveEntitlement([dataPolicy, userAttach]: [any, any]) {

		if (userAttach.length > 0) {
			userAttach.forEach(element => {

				this.httpService.get(this.queryService.generateDbQuery('l_main_leave_transaction', [], [`(USER_GUID=${element.USER_GUID})`, `(ENTITLEMENT_GUID=Anniversary Policy)`, `(STATUS!=CANCELLED)`, `(DELETED_AT IS NULL)`])).pipe(
					map(res => {

						if (dataPolicy.anniversaryBonus.allowAutoApplyLeave) {
							// true means there is allow for anniversary leave. hence, need to check and update if any changes
							this.applyAnniversaryLeave([element, element.DOB, element.JOIN_DATE, element.TENANT_COMPANY_GUID, element.USER_GUID, res.data.resource, dataPolicy.anniversaryBonus.applyLeaveOnDate]);
						} else {
							// false means not allow for anniversary leave. hence, need to remove if existing
							if (res.data.resource.length > 0)
								this.removeAppliedAnniversary([res.data.resource[0].LEAVE_TRANSACTION_GUID]);
						}
						return res.data.resource;
					})
				).subscribe(
					data => { /*console.log('data');*/ },
					err => { /*console.log('err');*/ }
				);
			});
		} else {
			console.log('No user attach');
		}

	}

	private removeAppliedAnniversary([leaveTransactionGuid]: [string]) {
		const model = new LeaveTransactionModel();
		let resource = new Resource(new Array);

		model.LEAVE_TRANSACTION_GUID = leaveTransactionGuid;
		model.STATUS = 'CANCELLED';
		model.DELETED_AT = new Date().toISOString();

		resource.resource.push(model);

		return this.httpService.patch(this.queryService.generateDbQueryV2('l_main_leave_transaction', [], [], []), resource).subscribe(
			data => { /*console.log(data);*/ }, err => { /*console.log(err);*/ }
		);

	}

	private applyAnniversaryLeave([user, anvDateDOB, anvDateJD, companyId, userId, dataLeaveApplied, onDate]) {

		onDate = Array.isArray(onDate) ? onDate : [onDate];
		// check wether has already apply
		if (dataLeaveApplied.length > 0) {
			// remove previous
			let resource = new Resource(new Array);
			dataLeaveApplied.forEach(element => {
				let ltm = new LeaveTransactionModel();
				ltm.LEAVE_TRANSACTION_GUID = element.LEAVE_TRANSACTION_GUID;
				ltm.STATUS = 'CANCELLED';
				ltm.DELETED_AT = new Date().toISOString();
				resource.resource.push(ltm);

			});
			this.httpService.patch(this.queryService.generateDbQueryV2('l_main_leave_transaction', [], [], []), resource).subscribe(
				data => { /*console.log(data.data.resource);*/ }, err => { /*console.log(err.response.data.error.context);*/ }
			);
		}

		// apply anniversary leave
		let resource = new Resource(new Array);
		onDate.forEach(element => {
			let anvDate;
			if (element == 'birthday')
				anvDate = anvDateDOB;
			if (element == 'join-date')
				anvDate = anvDateJD;

			anvDate = new Date(anvDate);
			let year = new Date().getFullYear()
			anvDate.setFullYear(year);

			let ltm = new LeaveTransactionModel();
			ltm.LEAVE_TRANSACTION_GUID = uuid(); // nn
			ltm.TENANT_GUID = user.TENANT_GUID;
			ltm.TENANT_COMPANY_GUID = companyId; // nn
			ltm.LEAVE_TYPE_GUID = 'Anniversary ' + element; // nn
			ltm.ENTITLEMENT_GUID = 'Anniversary Policy'; // nn
			ltm.USER_GUID = userId; // nn

			ltm.START_DATE = new Date(anvDate);
			ltm.END_DATE = new Date(anvDate);

			ltm.STATUS = 'APPROVED';

			ltm.ACTIVE_FLAG = true;
			ltm.CURRENT_APPROVAL_LEVEL = 0;

			resource.resource.push(ltm);

		});

		this.httpService.post(this.queryService.generateDbQueryV2('l_main_leave_transaction', [], [], []), resource).subscribe(
			data => { /*console.log(data.data.resource);*/ },
			err => { /*console.log(err.response.data.error.context); */ }
		);

	}

}