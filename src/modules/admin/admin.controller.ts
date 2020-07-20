import { Controller, Get } from "@nestjs/common";
import { RouteRender } from "../../framework/RouteRender.decorator";
import { RouteConfig } from "../../framework/route.config";


@Controller("Admin")
export class AdminController {
    constructor() {
        
    }

    @Get("Album")
    @RouteRender(RouteConfig.AdminAlbum.name)
    async Album() {
        return { initData: { AlbumList: [{ AlbumName: "a", ImageCount: 2, Describe: "asaaaa", Cover: "aaaa" }] } }
    }

    async AlbumList(){
        
    }

}