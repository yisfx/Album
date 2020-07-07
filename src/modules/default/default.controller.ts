import { Controller, Get, Req, Res, Post } from "@nestjs/common";
import { join } from "path";
import { HttpClient } from "../../framework/http.client";
import SysConfig from "src/conf/site.config";


@Controller()
export class DefaultController {
    constructor(private readonly httpClient: HttpClient) {

    }

    @Get(SysConfig.VisualStaticPath + "*.js")
    staticFile(@Req() req, @Res() res): any {
        let dir: [] = req.url.split("/")
        let f = dir[dir.length - 1]
        res.sendFile(join(__dirname, '../../', `public/${f}`))
    }

    @Post("/ajax/Api*")
    ajax(@Req() req, @Res() res): any {

        this.httpClient.get(req.url.replace("ajax/api", ""))
        return { Result: "Success" }
    }
}