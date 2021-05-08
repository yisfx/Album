import { Controller, Get, Post, Req, Res, UseInterceptors } from "@nestjs/common";
import { FastifyReply, FastifyRequest } from "fastify";
import { GlobalConfig } from "../../conf/global.config";
import { FXCellCookie } from "../../framework/cookie/cellFXCookie";
import { CookieName } from "../../framework/cookie/cookieName";
import { RouteRender } from "../../framework/decorators/RouteRender.decorator";
import { Encrypt } from "../../framework/encryption/hmac";
import { LayoutInterceptor } from "../../framework/interceptor/layout.Interceptor";
import { RouteConfig } from "../../framework/route.config";
import { Password } from "../../model/types/password.model";
import { LoginResponse } from "../../model/response/response.login";

@Controller()
@UseInterceptors(LayoutInterceptor)
export class LoginController {
    @Get(RouteConfig.AdminLogin.route)
    @RouteRender(RouteConfig.AdminLogin.name)
    async loginPage() {
        return { initData: {} }
    }

    @Post("/ajax/api/loginapi")
    async login(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
        let pwd = req.body;
        let encryptPwd: Password = { PasswordList: {}, Date: new Date().toString(), IP: req.ip }
        let isError: boolean = false;
        Object.keys(pwd).map(key => {
            let p = Encrypt(pwd[key])
            if (GlobalConfig.AdminPwd[key] != p) {
                isError = true;
            } else {
                encryptPwd.PasswordList[key] = p
            }
        })
        if (!isError) {
            let token = Encrypt(JSON.stringify(encryptPwd));
            let cookie = new FXCellCookie(CookieName.OnlyIdentificationKey, token).initialRawValue
            res.header("set-cookie", cookie);
            let result: LoginResponse = { Result: true, ErrorMessage: null, LoginToken: null };
            res.send(result);
        } else {
            res.send({ Result: false, ErrorMessage: "pwd error" });
        }
    }
}