import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import { Reflector } from '@nestjs/core';

/**
 * Resourceguard
 *
 * @export
 * @class ResourceGuard
 * @implements {CanActivate}
 */
@Injectable()
export class ResourceGuard implements CanActivate {
  /**
   *Creates an instance of ResourceGuard.
   * @param {Reflector} reflector
   * @memberof ResourceGuard
   */
  constructor(private readonly reflector: Reflector) { }

  /**
   * Method canActivate
   *
   * @param {ExecutionContext} context
   * @returns {boolean}
   * @memberof ResourceGuard
   */
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