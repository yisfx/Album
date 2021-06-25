import { Controller, Get, Req, Res } from "@nestjs/common";
import { join } from "path";
import { SysConfig } from "../../conf/site.config";
import fs from "fs";
import { GlobalConfig } from "../../conf/global.config";
import { ParseImageEncryptionUri } from "../../framework/encryption/encryptionUri";
import { PictureUrlLink } from "../../model/album";
import { FastifyRequest, FastifyReply } from "fastify";
import { ContentType } from "../../framework/types/contentType";

@Controller()
export class JPGController {
    constructor() {

    }

    @Get(`${SysConfig.VisualStaticPath}/album/:albumName`)
    albumJpg(@Req() req, @Res() res) {
        let dir: string[] = req.url.split("/")
        let name: string[] = dir[dir.length - 1].split("-")
        let albumName = name[0];
        let picName = name.join("-").replace(`${albumName}-`, "")
        let p = join(GlobalConfig.AlbumPath, albumName, picName);
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
    mixAlbumJpg(@Req() req, @Res() res) {
        let dir: string[] = req.url.split("/")
        const uri: PictureUrlLink = ParseImageEncryptionUri(dir[dir.length - 1])
        if (!uri) {
            res.send("url error");
        }

        let p = join(GlobalConfig.AlbumPath, uri.AlbumName, uri.Name + "-" + uri.Type) + ".jpg";
        if (fs.existsSync(p)) {
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

    @Get("favicon.ico")
    favicon(@Res() res: FastifyReply){
        let path = SysConfig.ImagePath;
        res.header("content-type", "content-type: image/x-icon");
        res.header("cache-control", "max-age=946080000, public ");
        fs.readFile(join(__dirname, '../../', path, "snow.png"), (err, fileBuffer) => {
            res.send(err || fileBuffer)
        })
    }
}
