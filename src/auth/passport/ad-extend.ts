import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';

/**
 * AD Auth Guard
 *
 * @export
 * @class ADAuthGuard
 * @extends {AuthGuard('ad')}
 */
export class ADAuthGuard extends AuthGuard('ad') {
  /**
   * Method can activate
   *
   * @param {ExecutionContext} context
   * @returns
   * @memberof ADAuthGuard
   */
  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.

    const request = context.switchToHttp().getRequest();

    console.log(request);
    return super.canActivate(context);
  }

  /**
   * Method handle request
   *
   * @param {*} err
   * @param {*} user
   * @param {*} info
   * @returns
   * @memberof ADAuthGuard
   */
  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}