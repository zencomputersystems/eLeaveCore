import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';


import { Reflector } from '@nestjs/core';
import { ResourceDecoratorModel } from 'src/decorator/resource.decorator.model';
import { roles } from './mock/role.mock';
var jwt = require('jsonwebtoken');

/**
 *
 *
 * @export
 * @class RolesGuard
 * @implements {CanActivate}
 */
@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {

        // get the resource name
        const resource = this.reflector.get<ResourceDecoratorModel>('resources', context.getHandler());

        // we need to check if current user has access to this operation on this resource
        const resourceName = resource.resourceName;
        const operation = resource.resourceOperation;

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        const permissionList = this.getRole(user.USER_GUID, resourceName, operation);

        // find permission
        const getPermissionLevel = permissionList.Properties.find(x => x.ResourceName === resourceName);

        if (getPermissionLevel) {
            const getPermissiomOperation = getPermissionLevel.Operation.find(x => x.name == operation);

            if (getPermissiomOperation) {
                // add level to request object
                request.accessLevel = getPermissionLevel.Level;
                return true;
            }
        }

        return false;

    }

    getRole(USER_GUID: string, RESOURCE_NAME: string, OPERATION: string) {
        // query db
        const accessProperties = roles;

        return accessProperties;
    }
}