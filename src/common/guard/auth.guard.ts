import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const headers = request.headers;
    // if (!headers['authorization']) {
      // const response = context.switchToHttp().getResponse();
      // // if (!response.headersSent) {
      //   response.status(401).json({
      //     "data": null,
      //     "status": {
      //       "code": "UNAUTHORIZED",
      //       "status": "Authentication is not present in the request",
      //       "description": "Authentication is not present in the request"
      //     }
      //   });
      // // }
      // return false;
    // }
    return true;
  }
}