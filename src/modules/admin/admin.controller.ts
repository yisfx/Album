import { Controller, Get } from "@nestjs/common";
import { RouteRender } from "../../framework/RouteRender.decorator";
import { RouteConfig } from "../../framework/route.config";
import { HttpClient } from "../../framework/http.client";


@Controller("Admin")
export class AdminController {
    constructor(private readonly httpClient: HttpClient) {

    }

    @Get("Album")
    @RouteRender(RouteConfig.AdminAlbumList.name)
    async Album() {
        let resp = await this.httpClient.createClient("ablumListApi");
        console.log(resp?.body)
        return { initData: { AlbumList: [{ AlbumName: "a", ImageCount: 2, Describe: "asaaaa", Cover: "aaaa" }] } }
    }

}