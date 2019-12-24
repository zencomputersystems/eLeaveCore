import { Injectable } from '@nestjs/common';
import { RoleDTO } from './dto/role.dto';
import { CreateRoleModel } from './model/create-role.model';
import { Resource } from 'src/common/model/resource.model';
import { v1 } from 'uuid';
import { RoleDbService } from './db/role.db.service';
import { map } from 'rxjs/operators';
import { RoleListDTO } from './dto/role-list.dto';
import { AssignerDataService } from 'src/common/helper/assigner-data.service';
import { UpdateRoleDTO } from './dto/update-role.dto';
import { UpdateRoleModel } from './model/update-role.model';
import { UpdateUserRoleDTO } from './dto/update-userrole.dto';
import { UpdateUserRoleModel } from './model/update-userrole.model';
import { UserInfoDbService } from '../holiday/db/user-info.db.service';
/** XMLparser from zen library  */
var { convertXMLToJson, convertJsonToXML } = require('@zencloudservices/xmlparser');

/**
 * Service for role
 *
 * @export
 * @class RoleService
 */
@Injectable()
export class RoleService {
	/**
	 *Creates an instance of RoleService.
	 * @param {RoleDbService} roleDbService
	 * @param {AssignerDataService} assignerDataService
	 * @param {UserInfoDbService} userinfoDbService
	 * @memberof RoleService
	 */
	constructor(
		private readonly roleDbService: RoleDbService,
		private readonly assignerDataService: AssignerDataService,
		private readonly userinfoDbService: UserInfoDbService
	) { }

	/**
	 * Get role profile function
	 *
	 * @param {*} user
	 * @returns
	 * @memberof RoleService
	 */
	public getRoleProfileList(user: any) {
		let url = this.roleDbService.queryService.generateDbQueryV2('l_view_role_profile', ['ROLE_GUID', 'CODE', 'DESCRIPTION', 'TOTAL_EMPLOYEE_ATTACH'], ['(TENANT_GUID=' + user.TENANT_GUID + ')'], []);
		return this.assignerDataService.processProfile([url, this.roleDbService, RoleListDTO]);
		// return this.roleDbService.httpService.get(url).pipe(map(res => {
		// 	if (res.status == 200) { return this.assignerDataService.assignArrayData(res.data.resource, RoleListDTO); }
		// }));
	}

	/**
	 * Get employee attach to role
	 *
	 * @param {string} roleId
	 * @param {string} tenant_guid
	 * @returns
	 * @memberof RoleService
	 */
	public getEmployeeRoleAttach(roleId: string, tenant_guid: string) {
		const filters = ['(ROLE_GUID=' + roleId + ')', 'AND (TENANT_GUID=' + tenant_guid + ')', 'AND (DELETED_AT IS NULL)'];
		// return this.userinfoDbService.findEmployeeAttach(filters);

		const fields = ['USER_GUID', 'FULLNAME', 'PERSONAL_ID_TYPE'];
		// const filters = ['(CALENDAR_GUID=' + calendarId + ')'];

		const url = this.roleDbService.queryService.generateDbQueryV3(['l_view_user_profile_list', fields, filters, null, null]);
		// return this.roleDbService.httpService.get(url).pipe(map(res => {
		// 	if (res.status == 200) {
		// 		return res.data.resource;
		// 	}
		// }));

		return this.assignerDataService.processProfile([url, this.roleDbService, RoleListDTO]);
	}

	/**
	 * Function to get role detail from role id function
	 *
	 * @param {string} roleId
	 * @returns
	 * @memberof RoleService
	 */
	public getRoleDetail(roleId: string) {
		return this.roleDbService.findAll(roleId).pipe(map(res => {
			if (res.status == 200) { return convertXMLToJson(res.data.resource[0].PROPERTIES_XML); }
		}))
	}

	/**
	 * Method to create new role
	 *
	 * @param {*} user
	 * @param {RoleDTO} data
	 * @returns
	 * @memberof RoleService
	 */
	create(user: any, data: RoleDTO) {

		const resource = new Resource(new Array);
		const modelData = new CreateRoleModel();

		modelData.CODE = data.code;
		modelData.ROLE_GUID = v1();
		modelData.TENANT_GUID = user.TENANT_GUID;
		modelData.CREATION_TS = new Date().toISOString();
		modelData.CREATION_USER_GUID = user.USER_GUID;
		modelData.PROPERTIES_XML = convertJsonToXML(data);
		modelData.UPDATE_TS = null;
		modelData.UPDATE_USER_GUID = null;
		modelData.DESCRIPTION = data.description;

		resource.resource.push(modelData);

		return this.roleDbService.createByModel(resource, [], [], []);
	}

	/**
	 * Method to update existing role
	 *
	 * @param {*} user
	 * @param {UpdateRoleDTO} d
	 * @returns
	 * @memberof RoleService
	 */
	updateRole(user: any, d: UpdateRoleDTO) {
		const resource = new Resource(new Array);
		const data = new UpdateRoleModel();

		data.PROPERTIES_XML = convertJsonToXML(d.data);
		data.CODE = d.data.code;
		data.UPDATE_TS = new Date().toISOString();
		data.UPDATE_USER_GUID = user.USER_GUID;
		data.DESCRIPTION = d.data.description;

		resource.resource.push(data);

		return this.roleDbService.updateByModel(resource, [], ['(ROLE_GUID=' + d.role_guid + ')'], ['ROLE_GUID', 'CODE', 'PROPERTIES_XML']);
	}

	/**
	 * Method to assign role to employee
	 *
	 * @param {*} user
	 * @param {UpdateUserRoleDTO} d
	 * @returns
	 * @memberof RoleService
	 */
	updateToEmployee(user: any, d: UpdateUserRoleDTO) {
		const resource = new Resource(new Array);
		const data = new UpdateUserRoleModel;

		data.ROLE_GUID = d.role_guid;
		data.UPDATE_TS = new Date().toISOString();
		data.UPDATE_USER_GUID = user.USER_GUID;

		let userList = this.assignerDataService.setBundleUserGuid(d);

		resource.resource.push(data);

		return this.userinfoDbService.updateByModel(resource, [], ['(USER_GUID IN (' + userList + '))'], []);
	}

	/**
	 * Verify if role profile have user attach
	 *
	 * @param {*} user
	 * @param {string} role_guid
	 * @returns
	 * @memberof RoleService
	 */
	deleteRole(user: any, role_guid: string) {
		const filters = ['(ROLE_GUID=' + role_guid + ')'];
		return this.userinfoDbService.findEmployeeAndDelete(filters, this.deleteProcessRole(user, role_guid));
	}

	/**
	 * Delete role profile: update deleted_at field
	 *
	 * @param {*} user
	 * @param {string} roleId
	 * @returns
	 * @memberof RoleService
	 */
	deleteProcessRole(user: any, roleId: string) {
		const resource = new Resource(new Array);
		const data = new UpdateRoleModel();

		data.UPDATE_TS = new Date().toISOString();
		data.UPDATE_USER_GUID = user.USER_GUID;
		data.DELETED_AT = new Date().toISOString();

		resource.resource.push(data);

		return this.roleDbService.updateByModel(resource, [], ['(ROLE_GUID=' + roleId + ')'], ['ROLE_GUID', 'CODE']);
	}

}