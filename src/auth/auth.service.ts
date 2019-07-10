import { Injectable, UnauthorizedException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { UserService } from 'src/admin/user/user.service';
import { ldap } from './passport/mock/ldap';

/**
 * Service for auth
 *
 * @export
 * @class AuthService
 */
@Injectable()
export class AuthService {
  /**
   *Creates an instance of AuthService.
   * @param {UserService} userService
   * @memberof AuthService
   */
  constructor(private readonly userService: UserService) { }

  /**
   * Method auth
   *
   * @param {string} email
   * @returns
   * @memberof AuthService
   */
  public authMethod(email: string) {
    return {
      url: 'ldap://zen.com.my',
      baseDN: 'DC=zen,DC=com,DC=my',
      username: 'tarmimi@zen.com.my',
      password: 'P@ss1234'
    }
  }

  /**
   * log the user using provided user password
   *
   * @param {*} email
   * @param {*} password
   * @returns
   * @memberof AuthService
   */
  public async logIn(email, password) {
    return await this.userService.findOne(email, password)
      .then(async user => {
        return (user.data.resource.length > 0)
          ? Promise.resolve(user.data.resource[0])
          : Promise.reject(new UnauthorizedException('Invalid Credential'))
      })
  }

  /**
   * Method ad login
   *
   * @param {*} data
   * @returns
   * @memberof AuthService
   */
  public async adLogin(data) {

    return await this.userService.findByFilterV2([], ['(LOGIN_ID=' + data._json.userPrincipalName + ')']).toPromise()
      .then(async user => {

        return (user.length > 0)
          ? Promise.resolve(user[0])
          : Promise.reject(new UnauthorizedException('Invalid Credential'))
      })
  }

  //create JWT token to be sent to client
  /**
   * Method create token
   *
   * @param {*} signedUser
   * @returns
   * @memberof AuthService
   */
  public async createToken(signedUser) {
    const expiresIn = 3300, secretOrKey = 'this_is_secret';
    const user = {
      email: signedUser.EMAIL,
      userId: signedUser.USER_GUID,
      tenantId: signedUser.TENANT_GUID
    };
    return {
      expires_in: expiresIn,
      access_token: await sign(user, secretOrKey, { expiresIn })
    }
  }

  //verify the JWT token data
  /**
   * Method verify
   *
   * @param {*} payload
   * @returns
   * @memberof AuthService
   */
  public async verify(payload) {
    return await this.userService.findOneByPayload(payload)
      .then(async user => {
        return (user.data.resource.length > 0)
          ? Promise.resolve(user.data.resource[0])
          : Promise.reject(new UnauthorizedException('Invalid Authorization'))
      })
  }
}
