import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

/**
 * class jwt 
 *
 * @export
 * @class JwtStrategy
 * @extends {PassportStrategy(Strategy)}
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   *Creates an instance of JwtStrategy.
   * @param {AuthService} authService
   * @memberof JwtStrategy
   */
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
      passReqToCallback: false,
      secretOrKey: 'this_is_secret',
    });
  }

  /**
   * Method validate
   *
   * @param {*} payload
   * @param {Function} done
   * @returns
   * @memberof JwtStrategy
   */
  async validate(payload, done: Function) {
    return await this.authService.verify(payload)
      .then(signedUser => done(null, signedUser))
      .catch(err => done(err, false))
  }
}