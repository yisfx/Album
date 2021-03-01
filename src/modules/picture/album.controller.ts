import { Controller, Get, Req, Res, Inject } from '@nestjs/common';
import { RouteRender } from '../../framework/decorators/RouteRender.decorator';
import { RouteConfig } from '../../framework/route.config';
import { HttpClient } from '../../framework/httpclient/http.client';

@Controller()
export class AlbumController {
	constructor(private readonly httpClient: HttpClient) {
		// super()
	}

	@Get(RouteConfig.ALBUM.route)
	@RouteRender(RouteConfig.ALBUM.name)
	async getHello() {
		//let a = await this.httpClient.get("getAlbum");

		return { initData: { a: "a", b: "b" } }
	}
	@Get()
	@RouteRender(RouteConfig.ALBUM.name)
	async Homepage() {
		console.log("homepage")
		//let a = await this.httpClient.get("getAlbum");

		return { initData: { a: "a", b: "b" } }
	}

}