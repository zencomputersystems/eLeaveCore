import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";


import { Reflector } from "@nestjs/core";
import { ResourceDecoratorModel } from "src/decorator/resource.decorator.model";
var jwt = require('jsonwebtoken');

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}
  
    canActivate(context: ExecutionContext): boolean {
        
        // get the resource name
        const resource = this.reflector.get<ResourceDecoratorModel>('resources', context.getHandler());
      
        // we need to check if current user has access to this operation on this resource
        const resourceName = resource.resourceName;
        const operation = resource.resourceOperation;

        const request = context.switchToHttp().getRequest();
        const user = request.user;
        
        // add level to request object
        request.level = "company";
        
        const countPermission = this.getRole(user.USER_GUID,resourceName,operation);

        if(countPermission > 0) {
            return true;
        }

        return false;
    }

    getRole(USER_GUID: string, RESOURCE_NAME: string, OPERATION: string) {
        // query db

        return 1;
    }
  }