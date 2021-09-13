import { Controller, Get, Post, Req, Res, UseInterceptors } from "@nestjs/common";
import { FastifyReply, FastifyRequest } from "fastify";
import { GlobalConfig } from "../../conf/global.config";
import { FXCellCookie } from "../../framework/cookie/cellFXCookie";
import { CookieName } from "../../framework/cookie/cookieName";
import { RouteRender } from "../../framework/decorators/RouteRender.decorator";
import { LayoutInterceptor } from "../../framework/interceptor/layout.Interceptor";
import { RouteConfig } from "../../framework/route.config";
import { Password } from "../../model/types/password.model";
import { LoginResponse } from "../../model/response/response.login";
import { HttpClient } from "../../framework/httpclient/http.client";

@Controller()
@UseInterceptors(LayoutInterceptor)
export class LoginController {

    constructor(private readonly httpClient: HttpClient) {
    }


    @Get(RouteConfig.AdminLogin.route)
    @RouteRender(RouteConfig.AdminLogin.name)
    async loginPage() {
        return { initData: {} }
    }

    @Post("/ajax/api/loginapi")
    async login(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
        let pwd = req.body;
        let loginRes= await this.httpClient.createClient<LoginResponse>("loginApi",{Password:pwd,IP:req.ip})
        
        if(loginRes.Result && loginRes.LoginToken){
            let cookie = new FXCellCookie(CookieName.OnlyIdentificationKey,loginRes.LoginToken).initialRawValue
            res.header("set-cookie", cookie);
            let result: LoginResponse = { Result: true, ErrorMessage: null, LoginToken: loginRes.LoginToken };
            res.send(result);
        }else{
            res.send({ Result: false, ErrorMessage: loginRes.ErrorMessage});
        }
    }
}