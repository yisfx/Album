import { Controller, Get, Param, Req, Res } from "@nestjs/common";
import { RouteRender } from "../../framework/decorators/RouteRender.decorator";
import { RouteConfig } from "../../framework/route.config";
import { HttpClient } from "../../framework/httpclient/http.client";
import { Album } from "../../model/album";
import { AlbumListResponse } from "../../model/response/albumListResponse";
import request from "request";
import { response } from "express";


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
    async AlbumPicList(@Req() request, @Res() response, @Param() route) {
        let resp = await this.httpClient.createClient<AlbumListResponse>("getAlbumPicApi");
    }

}