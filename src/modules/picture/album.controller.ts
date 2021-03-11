import { Controller, Get, Param } from '@nestjs/common';
import { RouteRender } from '../../framework/decorators/RouteRender.decorator';
import { RouteConfig } from '../../framework/route.config';
import { HttpClient } from '../../framework/httpclient/http.client';
import { AlbumListResponse } from '../../model/response/albumListResponse';
import { Decrypt, Encrypt } from "../../framework/encryption/hmac";
import { GetAlbumRequest } from '../../model/request/getAlbumRequest';
import { GetAlbumResponse } from '../../model/response/getAlbumResponse';

@Controller()
export class AlbumController {
	constructor(private readonly httpClient: HttpClient) {
	}

	async getAlbumList(): Promise<AlbumListResponse> {
		let resp = await this.httpClient.createClient<AlbumListResponse>("ablumListApi");
		if (resp?.Result) {
			resp.AlbumList = resp.AlbumList.map(album => {
				let a: any = {
					Cover: Encrypt(`${album.Name}/${album.Cover}-max`),
					Name: album.CNName,
					Date: album.Date,
					Description: album.Description
				}
				return a
			})
		}
		return resp;
	}

	async getAlbum(albumName: string): Promise<GetAlbumResponse> {
		let request: GetAlbumRequest = { AlbumName: albumName }
		let resp = await this.httpClient.createClient<GetAlbumResponse>("getAlbumPicApi", request);
		if (resp?.Result) {
			resp.Album.PicList.map(p => {
				p.Album = null
				p.OrgPath = null;
				p.MaxPath = Encrypt(`${resp.Album.Name}/${p.MaxPath}`);
				p.MiniPath = Encrypt(`${resp.Album.Name}/${p.MiniPath}`);
			})

			resp.Album.Cover = null;
			resp.Album.Name = resp.Album.CNName;
			resp.Album.CNName = null;
			resp.Album.Path = null;
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

	@Get(RouteConfig.AlbumPictureList.route)
	@RouteRender(RouteConfig.AlbumPictureList.name)
	async AlbumPicture(@Param("route") route) {
		let name: string[] = Decrypt(route).split("/")
		let albumName = name[0];
		let resp = await this.getAlbum(albumName)
		return { initData: { ...resp } }
	}

}