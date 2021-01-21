import { Controller, Get } from '@nestjs/common';
import { RouteRender } from '../../framework/decorators/RouteRender.decorator';
import { RouteConfig } from '../../framework/route.config';


// export abstract class BaseController { }

@Controller()
export class GiftController {
    constructor() {
        // super()
    }

    @Get("/mc" + RouteConfig.TianYang.route)
    @RouteRender(RouteConfig.TianYang.name)
    async Tianyang() {
        //let a = await this.httpClient.get("getAlbum");

        return { initData: { a: "a", b: "b" } }
    }

    @Get(RouteConfig.MC.route + "/:id")
    @RouteRender(RouteConfig.TianYang.name)
    async snow() {
        //let a = await this.httpClient.get("getAlbum");
        return { initData: { a: "a", b: "b" } }
    }

}