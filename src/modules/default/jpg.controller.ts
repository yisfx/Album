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
            fs.readFile(p, (err, fileBuffer) => {
                res.send(err || fileBuffer)
            })
        } else {
            res.send("");
        }
    }

    @Get(`${SysConfig.VisualStaticPath}${SysConfig.MixPath}/album/*`)
    mixAlbumJpg(@Req() req, @Res() res) {
        let dir: string[] = req.url.split("/")
        const uri: PictureUrlLink = ParseImageEncryptionUri(dir[dir.length - 1])
        if (!uri) {
            res.send("");
        }

        let p = join(GlobalConfig.AlbumPath, uri.AlbumName, uri.Name + "-" + uri.Type) + ".jpg";
        if (fs.existsSync(p)) {
            fs.readFile(p, (err, fileBuffer) => {
                res.send(err || fileBuffer)
            })
        } else {
            res.send("");
        }
    }

    @Get(`${SysConfig.VisualStaticPath}/:file`)
    cssFile(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
        let dir: string[] = req.url.split("/")
        let f = dir[dir.length - 1]
        let path: string
        if (req.url.endsWith(".css")) {
            res.header("content-type", ContentType.Css)
            path = SysConfig.JsPath;// SysConfig.CssPath///文件夹还未分开
        }
        else if (req.url.endsWith(".js")) {
            res.header("content-type", ContentType.Script)
            path = SysConfig.JsPath;
        }
        else
            path = SysConfig.ImagePath

        fs.readFile(join(__dirname, '../../', path, f), (err, fileBuffer) => {
            res.send(err || fileBuffer)
        })
    }
    @Get(`${SysConfig.VisualStaticPath}/image/:file`)
    staticImage(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
        let dir: string[] = req.url.split("/")
        let f = dir[dir.length - 1]
        let path: string = SysConfig.ImagePath

        fs.readFile(join(__dirname, '../../', path, f), (err, fileBuffer) => {
            res.send(err || fileBuffer)
        })
    }
}