import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable} from '@nestjs/common';
var Strategy = require('passport-activedirectory');

@Injectable()
export class ActiveDirectoryStrategy extends PassportStrategy(Strategy,'ad') {
    
  constructor(private readonly authService: AuthService) {
    super({
        integrated: false,
        usernameField: 'email',
        passReqToCallback: false,
        ldap: {
            url: 'ldap://zen.com.my',
            baseDN: 'DC=zen,DC=com,DC=my',
            username: 'tarmimi@zen.com.my',
            password: 'P@ss1234'
        }
    });
  }

  async validate(profile, ad, done: Function) {
    await this.authService.adLogin(profile)
    .then(user => done(null, user))
    .catch( err => done(err, false))
  }
}
