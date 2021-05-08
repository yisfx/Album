import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { FastifyRequestWithCookie } from "../../model/types/FastifyReqWithCookie";
import { FXCookie } from "../cookie/fxCookie";
import { useLoginTokenStorage } from "../cookie/logintoken.storage";
import { ValidateLogin } from "../validate/loginValidate";



@Injectable()
export class LoginGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        let request: FastifyRequestWithCookie = context.switchToHttp().getRequest();
        let fxCookie = FXCookie(request);
        let token = useLoginTokenStorage(fxCookie).getToken()
        if (token) {
            return ValidateLogin(token, request);
        }
        return false;
    }

}