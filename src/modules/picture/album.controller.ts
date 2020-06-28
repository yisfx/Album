import { Controller, Get, Req, Res, Inject } from '@nestjs/common';
import { RouteRender } from '../../framework/RouteRender.decorator';
import { RouteConfig } from '../../framework/route.config';
import { HttpClient } from '../../framework/http.client';


// export abstract class BaseController { }

@Controller()
export class AlbumController {
	constructor(private readonly httpClient: HttpClient) {
		// super()
	}

	@Get("picture")
	@RouteRender(RouteConfig.ALBUM.name)
	async getHello() {
		//let a = await this.httpClient.get("getAlbum");
		
		return { initData: { a:"a", b: "b" } }
	}

}