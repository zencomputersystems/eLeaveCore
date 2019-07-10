import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';


import { Reflector } from '@nestjs/core';
import { ResourceDecoratorModel } from 'src/decorator/resource.decorator.model';
import { roles } from './mock/role.mock';
/**
 * Include JWT 
 */
var jwt = require('jsonwebtoken');

/**
 * Guard for role
 *
 * @export
 * @class RolesGuard
 * @implements {CanActivate}
 */
@Injectable()
export class RolesGuard implements CanActivate {
    /**
     *Creates an instance of RolesGuard.
     * @param {Reflector} reflector
     * @memberof RolesGuard
     */
    constructor(private readonly reflector: Reflector) { }

    /**
     * canActivate method
     *
     * @param {ExecutionContext} context
     * @returns {boolean}
     * @memberof RolesGuard
     */
    canActivate(context: ExecutionContext): boolean {

        // get the resource name
        const resource = this.reflector.get<ResourceDecoratorModel>('resources', context.getHandler());
        // console.log('is in role');
        // console.log(resource);
        // we need to check if current user has access to this operation on this resource
        const resourceName = resource.resourceName;
        const resourceRef = resource.resourceRef;
        // const resourceData = resource.resourceData;
        // const operation = resource.resourceOperation;

        // console.log(resourceName);
        // console.log(resourceData);
        // console.log(operation);

        const request = context.switchToHttp().getRequest();
        const user = request.user;
        // , operation
        const permissionList = this.getRole(user.USER_GUID, user.TENANT_GUID);
        // console.log(permissionList.properties[resourceRef]);
        if (permissionList.property[resourceRef][resourceName].value) {
            // console.log(permissionList.properties[resourceRef][resourceName].value);
            request.accessLevel = permissionList.property[resourceRef][resourceName].level;
            return true;
        }
        // // find permission
        // const getPermissionLevel = permissionList.properties.find(x => x.ResourceName === resourceName);
        // console.log(getPermissionLevel);
        // if (getPermissionLevel) {
        //     const getPermissiomOperation = getPermissionLevel.Operation.find(x => x.name == operation);

        //     if (getPermissiomOperation) {
        //         // add level to request object
        //         request.accessLevel = getPermissionLevel.Level;
        //         return true;
        //     }
        // }



        // find permission
        //  const getPermissionLevel = permissionList.properties. .resourceName;
        //  console.log(getPermissionLevel);
        //  console.log('in hereeeeeee');
        //  if (getPermissionLevel) {
        //      const getPermissiomOperation = getPermissionLevel.Operation.find(x => x.name == operation);

        //      if (getPermissiomOperation) {
        //          // add level to request object
        //          request.accessLevel = getPermissionLevel.Level;
        //          return true;
        //      }
        //  }

        return false;

    }


    // , OPERATION: string
    /**
     * get role details
     *
     * @param {string} USER_GUID
     * @param {string} TENANT_GUID
     * @returns
     * @memberof RolesGuard
     */
    getRole(USER_GUID: string, TENANT_GUID: string) {
        // console.log(USER_GUID);
        // const checkUser = userList.find(x => x.USER_GUID.toString() === USER_GUID.toString());
        // this.roleGuardService.getRole(USER_GUID, TENANT_GUID).subscribe(
        // data => {
        //         console.log(data);
        // const roleId = "7ed41000-98aa-11e9-b9d9-0901b57c06f4";
        // this.roleGuardService.getRoleDetail(USER_GUID,TENANT_GUID).subscribe(
        //     data=>{
        //         console.log(data.data.resource);
        //     },err=>{

        //     }
        // )
        //         return data;
        // }, err => {

        // }
        // );
        // let infoUser = this.userInfoServices.findOne(USER_GUID,TENANT_GUID).subscribe(
        //     data=>{
        //         console.log(data.data.resource[0].ROLE_GUID);
        // const roleId = "7ed41000-98aa-11e9-b9d9-0901b57c06f4";
        //         this.roleService.getRoleDetail(roleId).subscribe(
        //             data=>{
        //                 console.log(data.data.resource);
        //             },err=>{

        //             }
        //         )
        // return data.data.resource[0].ROLE_GUID;
        // },err =>{

        //     }
        // );
        // console.log('detect here');
        // console.log(infoUser);

        // query db
        const accessProperties = roles;

        return accessProperties;
    }
}