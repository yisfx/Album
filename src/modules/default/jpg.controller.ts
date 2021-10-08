import { Controller, Get, Req, Res } from "@nestjs/common";
import { join } from "path";
import { SysConfig } from "../../conf/site.config";
import fs from "fs";
import { GlobalConfig } from "../../conf/global.config";
import { PictureUrlLink } from "../../model/album";
import { FastifyRequest, FastifyReply } from "fastify";
import { ContentType } from "../../framework/types/contentType";
import { HttpClient } from "../../framework/httpclient/http.client";
import { FastifyRequestWithCookie } from "../../model/types/FastifyReqWithCookie";
import { FXCookie } from "../../framework/cookie/fxCookie";
import { useLoginTokenStorage } from "../../framework/cookie/logintoken.storage";

@Controller()
export class JPGController {
    constructor(
        private readonly httpClient: HttpClient
    ) {

    }

    @Get(`${SysConfig.VisualStaticPath}/album/:albumName`)
    albumJpg(@Req() req, @Res() res) {
        let dir: string[] = req.url.split("/")

        let picName = dir[dir.length - 1]

        let p = join(GlobalConfig.AlbumPath, picName.split("-")[0], picName);

        if (fs.existsSync(p)) {
            res.header("cache-control", "max-age=946080000, public ");
            fs.readFile(p, (err, fileBuffer) => {
                res.send(err || fileBuffer)
            })
        } else {
            res.send("404");
        }
    }

    @Get(`${SysConfig.VisualStaticPath}${SysConfig.MixPath}/album/*`)
    async mixAlbumJpg(@Req() req, @Res() res) {
        let dir: string[] = req.url.split("/")
        let entryImage = dir[dir.length - 1]

        let cookie = FXCookie(req as FastifyRequestWithCookie)
        let loginToken = useLoginTokenStorage(cookie).getToken()

        let p = ""
        if (loginToken) {
            p = join(GlobalConfig.AlbumPath, entryImage.split('-')[0], entryImage) + ".jpg";
        } else {
            p = await this.httpClient.createClient("entryImageApi", { V: entryImage });
        }

        if (!p) {
            res.send("url error");
        }

        if (fs.existsSync(p)) {
            res.header("cache-control", "max-age=946080000, public ");
            res.header("content-type", ContentType.Jpg)
            fs.readFile(p, (err, fileBuffer) => {
                res.send(err || fileBuffer)
            })
        } else {
            res.send("file 404");
        }
    }

    @Get(`${SysConfig.VisualStaticPath}/:file`)
    cssFile(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
        let dir: string[] = req.url.split("/")
        let f = dir[dir.length - 1]
        let path: string
        if (req.url.endsWith(".css")) {
            res.header("content-type", ContentType.Css)
            path = SysConfig.CssPath;
        }
        else if (req.url.endsWith(".js")) {
            res.header("content-type", ContentType.Script)
            path = SysConfig.JsPath;
        }
        else
            path = SysConfig.ImagePath;
        res.header("cache-control", "max-age=946080000, public ");
        fs.readFile(join(__dirname, '../../', path, f), (err, fileBuffer) => {
            res.send(err || fileBuffer);
        });
    }
    @Get(`${SysConfig.VisualStaticPath}/image/:file`)
    staticImage(@Req() req: FastifyRequest, @Res() res: FastifyReply) {

        let dir: string[] = req.url.split("/")
        let f = dir[dir.length - 1]
        let path: string = SysConfig.ImagePath
        res.header("cache-control", "max-age=946080000, public ");
        fs.readFile(join(__dirname, '../../', path, f), (err, fileBuffer) => {
            res.send(err || fileBuffer)
        })
    }
    @Get(`${SysConfig.VisualStaticPath}/svg/:file`)
    staticSvg(@Req() req: FastifyRequest, @Res() res: FastifyReply) {

        let dir: string[] = req.url.split("/")
        let f = dir[dir.length - 1]
        let path: string = SysConfig.ImagePath
        res.header("cache-control", "max-age=946080000, public ");
        fs.readFile(join(__dirname, '../../', path, f), (err, fileBuffer) => {
            let ressss = "data:image/svg+xml;base64," + fileBuffer.toString("base64");
            res.send(err || ressss)
        })
    }


    @Get("favicon.ico")
    favicon(@Res() res: FastifyReply) {
        let path = SysConfig.ImagePath;
        res.header("content-type", "content-type: image/x-icon");
        res.header("cache-control", "max-age=946080000, public ");
        fs.readFile(join(__dirname, '../../', path, "snow.png"), (err, fileBuffer) => {
            res.send(err || fileBuffer)
        })
    }
}
