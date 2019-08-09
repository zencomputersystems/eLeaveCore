import { Injectable, HttpService } from '@nestjs/common';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { Observable, pipe, of, forkJoin } from 'rxjs';
import { Resource } from 'src/common/model/resource.model';
import { v1 } from 'uuid';
import { CompanyModel } from './model/company.model';
import { BaseDBService } from 'src/common/base/base-db.service';
import { IDbService } from 'src/interface/IDbService';
import { CommonFunctionService } from '../../common/helper/common-function.services';
import { map, mergeMap } from 'rxjs/operators';
import { DepartmentDbService } from '../department/db/department.db.service';
import { CompanyDTO } from './dto/company.dto';
import { UpdateCompanyDTO } from './dto/update-company.dto';

/**
 * Service for company
 *
 * @export
 * @class CompanyService
 * @extends {BaseDBService}
 * @implements {IDbService}
 */
@Injectable()
export class CompanyService extends BaseDBService implements IDbService {

	/**
	 * Declare table name tenant_company
	 *
	 * @private
	 * @memberof CompanyService
	 */
	private _tableName = "tenant_company";


	/**
	 *Creates an instance of CompanyService.
	 * @param {HttpService} httpService http service
	 * @param {QueryParserService} queryService query service
	 * @param {CommonFunctionService} commonFunctionService common function service
	 * @param {DepartmentDbService} departmentDBService department db service
	 * @memberof CompanyService
	 */
	constructor(
		public readonly httpService: HttpService,
		public readonly queryService: QueryParserService,
		public readonly commonFunctionService: CommonFunctionService,
		public readonly departmentDBService: DepartmentDbService) {
		super(httpService, queryService, "tenant_company");
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
		let result = this.commonFunctionService.findAllList([fields, TENANT_GUID, this.queryService, this.httpService, this._tableName]);

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
		const url = this.queryService.generateDbQueryV2(this._tableName, fields, filters, []);

		//call DF to validate the user
		// return this.httpService.get(url);
		let result = this.httpService.get(url);

		let list: CompanyDTO = new CompanyDTO;

		let dataCompany = this.commonFunctionService.getListData(result);

		let dataDepartment = this.departmentDBService.findByCompany(TENANT_GUID, id);

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

		return this.createByModel(resource, [], [], []);

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

		return this.updateByModel(resource, [], [], []);
	}

	/**
	 * Delete company: update deleted_at field
	 *
	 * @param {*} user
	 * @param {string} company_guid
	 * @returns
	 * @memberof CompanyService
	 */
	deleteCompany(user: any, company_guid: string) {

		const resource = new Resource(new Array);
		const data = new CompanyModel();

		data.DELETED_AT = new Date().toISOString();
		data.UPDATE_TS = new Date().toISOString();
		data.UPDATE_USER_GUID = user.USER_GUID;

		resource.resource.push(data);

		return this.updateByModel(resource, [], ['(TENANT_COMPANY_GUID=' + company_guid + ')'], ['TENANT_COMPANY_GUID', 'NAME']);
	}

}
