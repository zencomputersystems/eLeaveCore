import { AuthGuard } from "@nestjs/passport";
import { ExecutionContext, UnauthorizedException } from "@nestjs/common";

export class ADAuthGuard extends AuthGuard('ad') {
    canActivate(context: ExecutionContext) {
        // Add your custom authentication logic here
        // for example, call super.logIn(request) to establish a session.

        const request = context.switchToHttp().getRequest();

        console.log(request);
        return super.canActivate(context);
      }
    
      handleRequest(err, user, info) {
        if (err || !user) {
          throw err || new UnauthorizedException();
        }
        return user;
      }
}