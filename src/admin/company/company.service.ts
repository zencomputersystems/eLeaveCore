import { Injectable, HttpService } from '@nestjs/common';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { Observable, forkJoin } from 'rxjs';
import { Resource } from 'src/common/model/resource.model';
import { v1 } from 'uuid';
import { CompanyModel } from './model/company.model';
import { BaseDBService } from 'src/common/base/base-db.service';
import { IDbService } from 'src/interface/IDbService';
import { CommonFunctionService } from '../../common/helper/common-function.services';
import { map } from 'rxjs/operators';
import { CompanyDTO } from './dto/company.dto';
import { UpdateCompanyDTO } from './dto/update-company.dto';
import { UserInfoDbService } from '../holiday/db/user-info.db.service';

/**
 * DB service for company
 *
 * @export
 * @class CompanyDbService
 * @extends {BaseDBService}
 * @implements {IDbService}
 */
@Injectable()
export class CompanyDbService extends BaseDBService implements IDbService {
	/**
	 * Declare tablename
	 *
	 * @memberof CompanyDbService
	 */
	public tableDB = "tenant_company";
	/**
	 *Creates an instance of CompanyDbService.
	 * @param {HttpService} httpService Http service
	 * @param {QueryParserService} queryService Query parser service
	 * @memberof CompanyDbService
	 */
	constructor(public httpService: HttpService, public queryService: QueryParserService) {
		super(httpService, queryService, "tenant_company");
	}
}

/**
 * Company service
 *
 * @export
 * @class CompanyService
 */
@Injectable()
export class CompanyService {
	/**
	 *Creates an instance of CompanyService.
	 * @param {CompanyDbService} companyDbService DB service for ompany 
	 * @param {CommonFunctionService} commonFunctionService Common function service
	 * @param {UserInfoDbService} userinfoDbService user info db service
	 * @memberof CompanyService
	 */
	constructor(
		public companyDbService: CompanyDbService,
		public commonFunctionService: CommonFunctionService,
		public userinfoDbService: UserInfoDbService
	) {
	}

	/**
	 * find all tenant company
	 *
	 * @param {string} TENANT_GUID
	 * @returns {Observable<any>}
	 * @memberof CompanyService
	 */
	public findAll(TENANT_GUID: string): Observable<any> {

		const fields = ['TENANT_COMPANY_GUID', 'NAME'];
		let result = this.commonFunctionService.findAllList([fields, TENANT_GUID, this.companyDbService.queryService, this.companyDbService.httpService, this.companyDbService.tableDB]);

		return this.commonFunctionService.getListData(result);

	}

	/**
	 * find company department by id
	 *
	 * @param {*} TENANT_GUID
	 * @param {string} id
	 * @returns {Observable<any>}
	 * @memberof CompanyService
	 */
	public findById(TENANT_GUID: any, id: string): Observable<any> {

		const fields = ['TENANT_COMPANY_GUID', 'NAME'];
		const filters = ['(TENANT_COMPANY_GUID=' + id + ')', '(TENANT_GUID=' + TENANT_GUID + ')'];

		//url
		const url = this.companyDbService.queryService.generateDbQueryV2(this.companyDbService.tableDB, fields, filters, []);

		//call DF to validate the user
		// return this.httpService.get(url);
		let result = this.companyDbService.httpService.get(url);

		let list: CompanyDTO = new CompanyDTO;

		let dataCompany = this.commonFunctionService.getListData(result);

		let dataDepartment = this.findByCompany(TENANT_GUID, id);

		return forkJoin(
			dataCompany,
			dataDepartment
		).pipe(
			map(([first, second]) => {
				// forkJoin returns an array of values, here we map those values to an object
				list.companyId = first[0].TENANT_COMPANY_GUID;
				list.companyName = first[0].NAME;
				list.departmentList = [];

				second.forEach(element => {
					list.departmentList.push(new Object({ "department": element.DEPARTMENT }));
				});
				return list;
			})
		);
	}



	/**
	 * create new company
	 *
	 * @param {*} user
	 * @param {string} name
	 * @returns
	 * @memberof CompanyService
	 */
	create(user: any, name: string) {

		const resource = new Resource(new Array);
		const data = new CompanyModel();

		data.TENANT_COMPANY_GUID = v1();
		data.CREATION_TS = new Date().toISOString();
		data.CREATION_USER_GUID = user.USER_GUID;
		data.ACTIVATION_FLAG = 1;
		data.NAME = name;
		data.TENANT_GUID = user.TENANT_GUID;

		resource.resource.push(data);

		return this.companyDbService.createByModel(resource, [], [], []);

	}

	/**
	 * update existing company
	 *
	 * @param {*} user
	 * @param {*} d
	 * @returns
	 * @memberof CompanyService
	 */
	update(user: any, d: UpdateCompanyDTO) {

		const resource = new Resource(new Array);
		const data = new CompanyModel();

		data.TENANT_COMPANY_GUID = d.id;
		data.UPDATE_TS = new Date().toISOString();
		data.UPDATE_USER_GUID = user.USER_GUID;
		data.NAME = d.name;

		resource.resource.push(data);

		return this.companyDbService.updateByModel(resource, [], [], []);
	}

	/**
	 * Delete company and check if user has attach
	 *
	 * @param {*} user
	 * @param {string} company_guid
	 * @returns
	 * @memberof CompanyService
	 */
	deleteCompany(user: any, company_guid: string) {
		const filters = ['(TENANT_COMPANY_GUID=' + company_guid + ')'];
		return this.userinfoDbService.findEmployeeAndDelete(filters, this.deleteCompanyProcess(user, company_guid));
	}

	/**
	 * Delete company: update deleted_at field
	 *
	 * @param {*} user
	 * @param {string} company_guid
	 * @returns
	 * @memberof CompanyService
	 */
	deleteCompanyProcess(user: any, company_guid: string) {

		const resource = new Resource(new Array);
		const data = new CompanyModel();

		data.DELETED_AT = new Date().toISOString();
		data.UPDATE_TS = new Date().toISOString();
		data.UPDATE_USER_GUID = user.USER_GUID;

		resource.resource.push(data);

		return this.companyDbService.updateByModel(resource, [], ['(TENANT_COMPANY_GUID=' + company_guid + ')'], ['TENANT_COMPANY_GUID', 'NAME']);
	}

	/**
	 * Find department by company
	 *
	 * @param {string} tenantId
	 * @param {string} companyId
	 * @returns {Observable<any>}
	 * @memberof CompanyService
	 */
	public findByCompany(tenantId: string, companyId: string): Observable<any> {

		const fields = ['DEPARTMENT'];
		const filters = ['(TENANT_COMPANY_GUID=' + companyId + ')', '(TENANT_GUID=' + tenantId + ')'];

		const url = this.companyDbService.queryService.generateDbQueryV2('view_departments', fields, filters, []);
		let result = this.companyDbService.httpService.get(url);
		return this.commonFunctionService.getListData(result);
	}

}


