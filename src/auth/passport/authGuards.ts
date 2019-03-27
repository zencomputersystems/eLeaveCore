// import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
// import { Observable } from 'rxjs';
// import {passport} from 'passport';

// @Injectable()
// export class AuthGuards implements CanActivate {


//     canActivate(
//         context: ExecutionContext,
//     ): boolean | Promise<boolean> | Observable<boolean> {

//         const request = context.switchToHttp().getRequest();
    
//         const isAuthenticated = await new Promise<boolean>((resolve, reject) => {
//             passport.authenticate('jwt', { session: false }, (args) => {
//                   if (args != 200) {
//                     return resolve(false);
//                   }
//                   return resolve(true);
//               })(context.res.req, dataOrRequest.res, dataOrRequest.nex);
//           });
//           if (!isAuthenticated) {
//             throw new HttpException('', HttpStatus.UNAUTHORIZED);
//           }
//           return true;
//         }

//     }
// }