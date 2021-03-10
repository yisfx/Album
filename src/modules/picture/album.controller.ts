import { Controller, Get, Req, Res, Inject } from '@nestjs/common';
import { RouteRender } from '../../framework/decorators/RouteRender.decorator';
import { RouteConfig } from '../../framework/route.config';
import { HttpClient } from '../../framework/httpclient/http.client';
import { AlbumListResponse } from '../../model/response/albumListResponse';
import { Encrypt } from "../../framework/encryption/hmac";

@Controller()
export class AlbumController {
	constructor(private readonly httpClient: HttpClient) {
	}

	async getAlbumList(): Promise<AlbumListResponse> {
		let resp = await this.httpClient.createClient<AlbumListResponse>("ablumListApi");
		if (resp?.Result) {
			resp.AlbumList = resp.AlbumList.map(album => {
				album.Cover = Encrypt(`${album.Name}/${album.Cover}`)
				let a: any = {
					Cover: Encrypt(`${album.Name}/${album.Cover}`),
					Name: album.CNName,
					Date: album.Date,
					Description: album.Description
				}
				return a
			})
		}
		return resp;
	}


	@Get(RouteConfig.ALBUM.route)
	@RouteRender(RouteConfig.ALBUM.name)
	async getHello() {
		let resp = await this.getAlbumList();
		return { initData: { ...resp } }
	}

	@Get()
	@RouteRender(RouteConfig.ALBUM.name)
	async Homepage() {
		let resp = await this.getAlbumList();
		return { initData: { ...resp } }
	}

}