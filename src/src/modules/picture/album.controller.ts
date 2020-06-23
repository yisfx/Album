import { Controller, Get, Req, Res, Inject } from '@nestjs/common';
import { LayoutRender } from '../../framework/LayoutRender.decorator';
import { RouteConfig } from '../../framework/route.config';
import { HttpClient } from '../../framework/http.client';


// export abstract class BaseController { }

@Controller()
export class AlbumController {
	constructor(private readonly httpClient: HttpClient) {
		// super()
	}

	@Get("picture")
	@LayoutRender(RouteConfig.ALBUM.name)
	async getHello() {
		return { a: "a", b: "" }
	}

}