import { Body, Controller, Get, Param, Post, Req, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { RouteRender } from "../../framework/decorators/RouteRender.decorator";
import { RouteConfig } from "../../framework/route.config";
import { HttpClient } from "../../framework/httpclient/http.client";
import { AlbumListResponse } from "../../model/response/albumListResponse";
import { GetAlbumRequest } from "../../model/request/getAlbumRequest";
import { FilesInterceptor } from '@nestjs/platform-express';


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
        let resp = await this.httpClient.createClient<AlbumListResponse>("getAlbumPicApi", request);
        return { initData: { ...resp } }
    }
    @Post("PictureUploadApi")
    @UseInterceptors(FilesInterceptor("files"))
    async PictureUpload(@Res() response, @UploadedFile() files, @Body() body) {
        response.send({ Result: true, files, body })
    }
}