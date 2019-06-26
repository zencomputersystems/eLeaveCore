import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import { Reflector } from '@nestjs/core';

@Injectable()
export class ResourceGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    // console.log(roles);
    // console.log('in resource guard');
    if (!roles) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    // console.log(request);
    // console.log('is request');

    // check user permission list
    const isInPermisson = true;

    if (isInPermisson) {
      request.accessLevel = "all";

      return true;
    }
    return false;
  }
}