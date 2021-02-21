import { Controller, Get, Req, Res, Post, Param } from "@nestjs/common";
import { join } from "path";
import { HttpClient } from "../../framework/httpclient/http.client";
import SysConfig from "../../conf/site.config";
import { BaseResponse } from "../../model/response/baseResponse";


@Controller()
export class DefaultController {
    constructor(private readonly httpClient: HttpClient) {

    }

    @Get(SysConfig.VisualStaticPath + "/*.js")
    staticFile(@Req() req, @Res() res) {
        let dir: [] = req.url.split("/")
        let f = dir[dir.length - 1]
        res.sendFile(join(__dirname, '../../', SysConfig.JsPath, f))
    }
    @Get(SysConfig.VisualStaticPath + "/*.png")
    staticPng(@Req() req, @Res() res) {
        let dir: [] = req.url.split("/")
        let f = dir[dir.length - 1]
        res.sendFile(join(__dirname, '../../', SysConfig.ImagePath, f))
    }

    @Get(SysConfig.VisualStaticPath + "/album/*.jpg")
    albumJpg(@Req() req, @Res() res) {
        let dir: string[] = req.url.split("/")
        let name: string[] = dir[dir.length - 1].split("-")
        let albumName = name[0];
        let picName = name.join("-").replace(`${albumName}-`, "")
        let p = join(SysConfig.AlbumPath, albumName, picName);
        res.sendFile(p)
    }

    @Get(SysConfig.VisualStaticPath + "/*.jpg")
    staticJpg(@Req() req, @Res() res) {
        let dir: [] = req.url.split("/")
        let f = dir[dir.length - 1]
        res.sendFile(join(__dirname, '../../', SysConfig.ImagePath, f))
    }


    @Post("/ajax/api/:route")
    async ajaxPost(@Req() req, @Res() res, @Param("route") route) {
        let response = await this.httpClient.createClient<BaseResponse>(route, req.body)
        res.send(response)
    }
}
