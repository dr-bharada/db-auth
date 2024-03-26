import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { RestApiService } from "../service/rest-api.service";
import { RestApi } from "../models/restApi";
import { IncomingMessage } from "http";

@Injectable()
export class AuthGuard implements CanActivate {
  allRestList: RestApi[] = []
  constructor(private restService: RestApiService) { this.restService.getAllRestApiList().then((allAPi: RestApi[]) => this.allRestList = allAPi) }
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const response = context.switchToHttp().getResponse();
    const request = context.switchToHttp().getRequest() as IncomingMessage;
    const token = request.headers.token;
    const requestPath = request.url;
    console.log(token, requestPath);
    console.log(this.allRestList.find((restApi: RestApi) => restApi.apiName === requestPath.substring(1)));

    // if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    //   const token = authorizationHeader.substring(7);
    //   console.log(token);
    // } else {
    //   console.log('Authorization header is missing or invalid');
    // }
    // console.log(this.allRestList.find(restApi => restApi?.apiName === request.path.substring(1)));
    if (false) {
      response.status(401).json({
        "data": null,
        "status": {
          "code": "UNAUTHORIZED",
          "status": "Authentication is not present in the request",
          "description": "Authentication is not present in the request"
        }
      });
      return false
    }
    return true
  }
}