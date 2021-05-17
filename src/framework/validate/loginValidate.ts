import { FastifyRequestWithCookie } from "../../model/types/FastifyReqWithCookie";
import { GlobalConfig } from "../../conf/global.config";
import { Password } from "../../model/types/password.model";
import { Decrypt } from "../encryption/hmac";



export const ValidateLogin = (token: string, request: FastifyRequestWithCookie) => {
    let password = JSON.parse(Decrypt(token)) as Password;
    if (password.IP != request.ip) {
        return false;
    }
    // if (((new Date()).getTime() - new Date(password.Date).getTime()) / 1000 > 5 * 60) {
    //     return false;
    // }

    let result = Object.keys(password.PasswordList).map(key => {
        return GlobalConfig.AdminPwd[key] == password.PasswordList[key]
    })
    return result.findIndex(x => !x) < 0

}