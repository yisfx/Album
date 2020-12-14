import { Controller, Get } from '@nestjs/common';
import { RouteRender } from '../../framework/RouteRender.decorator';
import { RouteConfig } from '../../framework/route.config';


// export abstract class BaseController { }

@Controller()
export class GiftController {
    constructor() {
        // super()
    }

    @Get(RouteConfig.TianYang.route)
    @RouteRender(RouteConfig.TianYang.name)
    async snow() {
        //let a = await this.httpClient.get("getAlbum");

        return { initData: { a: "a", b: "b" } }
    }

}