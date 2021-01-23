import { Controller, Get, Req, Res, Post, Param } from "@nestjs/common";
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

    @Post("/ajax/api/:route")
    ajaxGet(@Req() req, @Res() res, @Param("route") route): any {
        this.httpClient.createClient(route,req.body)
        res.send({ Result: "success" })
    }
}
