import { Controller, Get } from "@nestjs/common";
import { RouteRender } from "../../framework/decorators/RouteRender.decorator";
import { RouteConfig } from "../../framework/route.config";
import { HttpClient } from "../../framework/httpclient/http.client";
import { Album } from "../../model/album";


@Controller("Admin")
export class AdminController {
    constructor(private readonly httpClient: HttpClient) {

    }

    @Get("Album")
    @RouteRender(RouteConfig.AdminAlbumList.name)
    async Album() {
        // let resp = await this.httpClient.createClient<Album[]>("ablumListApi");
        return {
            initData: { AlbumList: [] }
        }

    }
}