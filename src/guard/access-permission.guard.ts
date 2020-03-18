import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { mergeMap } from 'rxjs/operators';
import { runServiceCallback } from 'src/common/helper/basic-functions';

import { Reflector } from '@nestjs/core';
import { AccessPermissionDecoratorModel } from '../decorator/access-permission.decorator.model';
import { UserprofileDbService } from '../api/userprofile/db/userprofile.db.service';
import { RoleDbService } from 'src/admin/role/db/role.db.service';

/** XMLparser from zen library  */
var { convertXMLToJson } = require('@zencloudservices/xmlparser');

/**
 * Access permission guard
 *
 * @export
 * @class AccessPermissionGuard
 * @implements {CanActivate}
 */
@Injectable()
export class AccessPermissionGuard implements CanActivate {

  /**
   *Creates an instance of AccessPermissionGuard.
   * @param {Reflector} reflector
   * @param {UserprofileDbService} userprofileDbService // Get role guid (must include in module that call AccessPermissionGuard)
   * @param {RoleDbService} roleDbService // Get user role detail (must include in module that call AccessPermissionGuard)
   * @memberof AccessPermissionGuard
   */
  constructor(
    private readonly reflector: Reflector,
    private readonly userprofileDbService: UserprofileDbService,
    private readonly roleDbService: RoleDbService
  ) { }

  /**
   * canActivate method
   * This method used to validate whether we allow that api to run or not. the return will only true or false
   * But what we do heve is to setup accesslevel which the user can access whether all, company, branch, or department
   *
   * @param {ExecutionContext} context
   * @returns {boolean}
   * @memberof RolesGuard
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {

    // get the resource name (access-permission model convert to array)
    const permissionData = this.reflector.get<AccessPermissionDecoratorModel[]>('access-permission', context.getHandler());

    // get request header to use in operation
    const request = context.switchToHttp().getRequest();
    // get user guid and tenant guid
    const user = request.user;
    // setup accesslevel data
    request.accessLevel = [];

    // get user role policy data to validate
    const permissionList = await this.getRole(user.USER_GUID);

    // initiate status to allow run service
    let status = true;

    // loop each permission to validate
    permissionData.forEach(element => {
      // check if need to validate second level object role property
      if (element.rulesDetail == '') {
        if (permissionList.property[element.rulesName].value === true) {
          // merge all permission level to verify
          request.accessLevel.push({ permission: element, level: permissionList.property[element.rulesName].level });
          // set if allow or disallow
          status = status == false ? false : true;
        } else {
          status = false;
        }
      } else if (element.rulesName != '' && element.rulesDetail != '') { // if have second level rules validation
        if (permissionList.property[element.rulesName][element.rulesDetail].value === true) {
          // merge all permission level to verify
          request.accessLevel.push({ permission: element, level: permissionList.property[element.rulesName][element.rulesDetail].level });
          // set if allow or disallow
          status = status == false ? false : true;
        } else {
          status = false;
        }
      }

    });
    // send back final status if true allow to use the api
    return status;

  }

  /**
   * get role details
   *
   * @param {string} USER_GUID
   * @returns
   * @memberof AccessPermissionGuard
   */
  async getRole(USER_GUID: string) {
    // Get role guid from db using user guid
    const method = this.userprofileDbService.findByFilterV2(['ROLE_GUID'], [`(USER_GUID=${USER_GUID})`]).pipe(
      mergeMap(res => {
        // Get role detail from role profile 
        return this.roleDbService.findByFilterV2(['PROPERTIES_XML'], [`(ROLE_GUID=${res[0].ROLE_GUID})`]);
      })
    )
    // Run callback method
    let dataRolePermission = await runServiceCallback(method);
    // send back json instead of xml format structure
    return convertXMLToJson(dataRolePermission[0].PROPERTIES_XML);
  }
}