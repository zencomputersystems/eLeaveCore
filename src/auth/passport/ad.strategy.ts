import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ldap } from './mock/ldap';
var Strategy = require('passport-activedirectory');

/**
 * Class active directory strategy
 *
 * @export
 * @class ActiveDirectoryStrategy
 * @extends {PassportStrategy(Strategy,'ad')}
 */
@Injectable()
export class ActiveDirectoryStrategy extends PassportStrategy(Strategy, 'ad') {

  /**
   *Creates an instance of ActiveDirectoryStrategy.
   * @param {AuthService} authService
   * @memberof ActiveDirectoryStrategy
   */
  constructor(
    private readonly authService: AuthService) {
    super(
      {
        integrated: false,
        usernameField: 'email',
        passReqToCallback: false,
        ldap: ldap
      }
    );
  }

  /**
   * Method validate
   *
   * @param {*} profile
   * @param {*} ad
   * @param {Function} done
   * @memberof ActiveDirectoryStrategy
   */
  async validate(profile, ad, done: Function) {
    await this.authService.adLogin(profile)
      .then(user => done(null, user))
      .catch(err => done(err, false))
  }
}
