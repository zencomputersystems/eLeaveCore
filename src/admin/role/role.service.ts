import { Injectable } from '@nestjs/common';
import { RoleDTO } from './dto/role.dto';
import { XMLParserService } from 'src/common/helper/xml-parser.service';
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
     * @param {XMLParserService} xmlParserService
     * @param {RoleDbService} roleDbService
     * @param {AssignerDataService} assignerDataService
     * @param {UserInfoDbService} userinfoDbService
     * @memberof RoleService
     */
    constructor(
        private readonly xmlParserService: XMLParserService,
        private readonly roleDbService: RoleDbService,
        private readonly assignerDataService: AssignerDataService,
        private readonly userinfoDbService: UserInfoDbService
    ) { }

    /**
     * Get role profile function
     *
     * @returns
     * @memberof RoleService
     */
    public findRoleProfile() {
        return this.roleDbService.findAllRoleProfile()
            .pipe(map(res => {
                if (res.status == 200) {
                    return this.assignerDataService.assignArrayData(res.data.resource, RoleListDTO);
                }
            })
            )
    }

    /**
     * Function to get role detail from role id function
     *
     * @param {string} roleId
     * @returns
     * @memberof RoleService
     */
    public getRoleDetail(roleId: string) {
        return this.roleDbService.findAll(roleId)
            .pipe(map(res => {
                if (res.status == 200) {
                    let jsonHoliday = this.xmlParserService.convertXMLToJson(res.data.resource[0].PROPERTIES_XML);
                    return jsonHoliday;
                }
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
        // let tempData = this.xmlParserService.convertJsonToXML(data);
        // console.log(tempData);

        const resource = new Resource(new Array);
        const modelData = new CreateRoleModel();

        modelData.CODE = data.code;
        modelData.ROLE_GUID = v1();
        modelData.CREATION_TS = new Date().toISOString();
        modelData.CREATION_USER_GUID = user.USER_GUID;
        modelData.PROPERTIES_XML = this.xmlParserService.convertJsonToXML(data);
        modelData.UPDATE_TS = null;
        modelData.UPDATE_USER_GUID = null;
        modelData.DESCRIPTION = data.description;

        resource.resource.push(modelData);
        // console.log(resource)

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

        data.PROPERTIES_XML = this.xmlParserService.convertJsonToXML(d.data);
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
        // let userList = '';
        // for (let i = 0; i < d.user_guid.length; i++) {
        //     if (userList == '') {
        //         userList = '"' + d.user_guid[i] + '"';
        //     } else {
        //         userList = userList + ',"' + d.user_guid[i] + '"';
        //     }
        // }
        let userList = this.assignerDataService.setBundleUserGuid(d);

        resource.resource.push(data);

        return this.userinfoDbService.updateByModel(resource, [], ['(USER_GUID IN (' + userList + '))'], []);
    }
    /**
     * Delete role profile: update deleted_at field
     *
     * @param {*} user
     * @param {string} roleId
     * @returns
     * @memberof RoleService
     */
    deleteRole(user: any, roleId: string) {
        const resource = new Resource(new Array);
        const data = new UpdateRoleModel();

        data.UPDATE_TS = new Date().toISOString();
        data.UPDATE_USER_GUID = user.USER_GUID;
        data.DELETED_AT = new Date().toISOString();

        resource.resource.push(data);

        return this.roleDbService.updateByModel(resource, [], ['(ROLE_GUID=' + roleId + ')'], ['ROLE_GUID', 'CODE']);
    }
}