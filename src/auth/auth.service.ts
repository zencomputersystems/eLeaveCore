import { Injectable, UnauthorizedException } from '@nestjs/common';
import {sign} from 'jsonwebtoken';
import { UserService } from 'src/admin/user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    //log the user using provided user password
    public async logIn(email, password) {
        return await this.userService.findOne(email, password)
        .then(async user => {
          return (user.data.resource.length>0)
          ? Promise.resolve(user.data.resource[0])
          : Promise.reject(new UnauthorizedException('Invalid Credential'))
        })
    }

    public async adLogin(data) {

      return await this.userService.findByFilter(['(LOGIN_ID='+data._json.userPrincipalName+')'],).toPromise()
      .then(async user => {

        return (user.data.resource.length>0)
        ? Promise.resolve(user.data.resource[0])
        : Promise.reject(new UnauthorizedException('Invalid Credential'))
      })
    }

    //create JWT token to be sent to client
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
    public async verify(payload) {
        return await this.userService.findOneByPayload(payload)
        .then(async user => {
            return (user.data.resource.length>0)
          ? Promise.resolve(user.data.resource[0])
          : Promise.reject(new UnauthorizedException('Invalid Authorization'))
        })
      }
}
