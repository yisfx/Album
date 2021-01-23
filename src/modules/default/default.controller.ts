import { Controller, Get, Req, Res, Post } from "@nestjs/common";
import { join } from "path";
import { HttpClient } from "../../framework/httpclient/http.client";
import SysConfig from "../../conf/site.config";


@Controller()
export class DefaultController {
    constructor(private readonly httpClient: HttpClient) {

    }

    @Get(SysConfig.VisualStaticPath + "*.js")
    staticFile(@Req() req, @Res() res): any {
        let dir: [] = req.url.split("/")
        let f = dir[dir.length - 1]
        res.sendFile(join(__dirname, '../../', SysConfig.JsPath, f))
    }
    @Get(SysConfig.VisualStaticPath + "*.png")
    staticImage(@Req() req, @Res() res): any {
        let dir: [] = req.url.split("/")
        let f = dir[dir.length - 1]
        res.sendFile(join(__dirname, '../../', SysConfig.ImagePath, f))
    }

    @Post("/ajax/api/*")
    ajaxPost(@Req() req, @Res() res): any {
        this.httpClient.get(req.url.replace("/ajax/api", ""))
        res.send({ Result: "success" })
    }
    @Get("/ajax/api/*")
    ajaxGet(@Req() req, @Res() res): any {
        this.httpClient.get(req.url.replace("/ajax/api", ""))
        res.send({ Result: "success" })
    }
}
