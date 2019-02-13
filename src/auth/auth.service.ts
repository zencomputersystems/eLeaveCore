import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import {sign} from 'jsonwebtoken';
import { async } from 'rxjs/internal/scheduler/async';

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
