import { Controller, Get, Req, Res } from "@nestjs/common";
import { join } from "path";
import { SysConfig } from "../../conf/site.config";
import fs from "fs";
import { Decrypt } from "../../framework/encryption/hmac";
import { GlobalConfig } from "../../conf/global.config";

@Controller()
export class JPGController {
    constructor() {

    }

    @Get(SysConfig.VisualStaticPath + "/album/*.jpg")
    albumJpg(@Req() req, @Res() res) {
        let dir: string[] = req.url.split("/")
        let name: string[] = dir[dir.length - 1].split("-")
        let albumName = name[0];
        let picName = name.join("-").replace(`${albumName}-`, "")
        let p = join(GlobalConfig.AlbumPath, albumName, picName);
        if (fs.existsSync(p)) {
            res.sendFile(p)
        } else {
            res.send("");
        }
    }

    @Get(SysConfig.VisualStaticPath + SysConfig.MixPath + "/album/*")
    mixAlbumJpg(@Req() req, @Res() res) {
        let dir: string[] = req.url.split("/")
        let name: string[] = Decrypt(dir[dir.length - 1]).split("/")

        let albumName = name[0];
        ///pic 命名混乱
        let picName = name.join("-").replace(`${albumName}-`, "")

        let p = join(GlobalConfig.AlbumPath, albumName, picName) + ".jpg";
        if (fs.existsSync(p)) {
            res.sendFile(p)
        } else {
            res.send("");
        }
    }


    @Get(SysConfig.VisualStaticPath + "/*.jpg")
    staticJpg(@Req() req, @Res() res) {
        let dir: [] = req.url.split("/")
        let f = dir[dir.length - 1]
        res.sendFile(join(__dirname, '../../', SysConfig.ImagePath, f))
    }

    @Get(SysConfig.VisualStaticPath + "/*.png")
    staticPng(@Req() req, @Res() res) {
        let dir: [] = req.url.split("/")
        let f = dir[dir.length - 1]
        res.sendFile(join(__dirname, '../../', SysConfig.ImagePath, f))
    }
}