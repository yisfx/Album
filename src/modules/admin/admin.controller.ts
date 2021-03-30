import { Body, Controller, Get, Param, Post, Req, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { RouteRender } from "../../framework/decorators/RouteRender.decorator";
import { RouteConfig } from "../../framework/route.config";
import { HttpClient } from "../../framework/httpclient/http.client";
import { AlbumListResponse } from "../../model/response/albumListResponse";
import { GetAlbumRequest } from "../../model/request/getAlbumRequest";
import { FilesInterceptor } from '@nestjs/platform-express';
import { GetAlbumResponse } from "../../model/response/getAlbumResponse";
import { createWriteStream } from "fs";
import { join } from "path"
import { ServerResponse } from "http";
import { FastifyReply, FastifyRequest } from "fastify";
import { Encrypt } from "src/framework/encryption/hmac";


@Controller()
export class AdminController {
    constructor(private readonly httpClient: HttpClient) {
    }

    @Get(RouteConfig.AdminAlbumList.route)
    @RouteRender(RouteConfig.AdminAlbumList.name)
    async Album() {
        let resp = await this.httpClient.createClient<AlbumListResponse>("ablumListApi");
        return {
            initData: { ...resp }
        }
    }

    @Get(RouteConfig.AdminAlbumPicList.route)
    @RouteRender(RouteConfig.AdminAlbumPicList.name)
    async AlbumPicList(@Param("route") route) {
        let request: GetAlbumRequest = { AlbumName: route }
        let resp = await this.httpClient.createClient<GetAlbumResponse>("getAlbumPicApi", request);
        resp.Album.PicList.map(d => { d.MaxPath = d.MiniPath = d.OrgPath = undefined });
        return { initData: { ...resp } }
    }

    @Post("PictureUploadApi")
    @UseInterceptors(FilesInterceptor("files", 1))
    async PictureUpload(@Res() response, @UploadedFile("files") files, @Body() body) {
        let request: GetAlbumRequest = { AlbumName: body["AlbumName"] }
        let album = await this.httpClient.createClient<GetAlbumResponse>("getAlbumPicApi", request);
        if (album.Album?.PicList?.find((p) => p.Name === files[0].originalname)) {
            response.send({ Result: false, ErrorMessage: "Exists Picture" })
        }
        ///save
        let file = files[0];
        let name = (file.originalname as string).split(".")
        let fileName = album.Album.Name + "-" + name[0] + "-org." + name[1];
        let stream = createWriteStream(join(album.Album.Path, fileName))
        stream.write(file.buffer);
        stream.close();
        response.send({ Result: true })
    }

    @Post("PictureUploadApi")
    @UseInterceptors(FilesInterceptor("files", 1))
    async UploadBase64Picture(@Res() response, @UploadedFile("files") files, @Body() body) {

        let request: GetAlbumRequest = { AlbumName: body["AlbumName"] }
        let album = await this.httpClient.createClient<GetAlbumResponse>("getAlbumPicApi", request);
        if (album.Album?.PicList?.find((p) => p.Name === files[0].originalname)) {
            response.send({ Result: false, ErrorMessage: "Exists Picture" })
        }
        ///save
        let file = files[0];
        let name = (file.originalname as string).split(".")
        let fileName = album.Album.Name + "-" + name[0] + "-org." + name[1];
        let stream = createWriteStream(join(album.Album.Path, fileName))
        stream.write(file.buffer);
        stream.close();
        response.send({ Result: true })
    }


    @Get(RouteConfig.AdminLogin.route)
    @RouteRender(RouteConfig.AdminLogin.name)
    async loginPage() {
        return { initData: {} }
    }

    @Post("/ajax/api/loginapi")
    async login(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
        let pwd = req.body;
        Object.keys(pwd).map(key => {
            pwd[key];
        })
        res.send("123123");
    }

}