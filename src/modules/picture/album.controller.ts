import { Controller, Get, Param, Redirect, UseInterceptors } from '@nestjs/common';
import { RouteRender } from '../../framework/decorators/RouteRender.decorator';
import { RouteConfig } from '../../framework/route.config';
import { HttpClient } from '../../framework/httpclient/http.client';
import { AlbumListResponse } from '../../model/response/albumListResponse';
import { Decrypt, Encrypt } from "../../framework/encryption/hmac";
import { GetAlbumRequest } from '../../model/request/getAlbumRequest';
import { GetAlbumResponse } from '../../model/response/getAlbumResponse';
import { BuildImageEncryptionUri } from '../../framework/encryption/encryptionUri';
import { BuildMenu } from './utils/menu-tool';
import { Album } from '../../model/album';
import { LayoutInterceptor } from '../../framework/interceptor/layout.Interceptor';

@Controller()
@UseInterceptors(LayoutInterceptor)
export class AlbumController {
	constructor(private readonly httpClient: HttpClient) {
	}

	async getAlbumList(): Promise<{ [key: string]: Album[] }> {
		let resp = await this.httpClient.createClient<AlbumListResponse>("ablumListApi");
		if (resp?.Result) {
			resp.AlbumList = resp.AlbumList.map(album => {
				let a: any = {
					Cover: BuildImageEncryptionUri(album.Name, album.Cover, "Max"),
					Name: album.CNName,
					Date: album.Date,
					Description: album.Description,
					CNName: Encrypt(`${album.Name}-${new Date().toString()}`)
				}
				return a
			})
		}

		let albumList = BuildMenu(resp.AlbumList)
		return albumList;
	}

	async getAlbum(albumName: string): Promise<GetAlbumResponse> {
		let request: GetAlbumRequest = { AlbumName: albumName }
		let resp = await this.httpClient.createClient<GetAlbumResponse>("getAlbumPicApi", request);
		if (resp?.Result) {
			resp.Album.PicList.map(p => {
				p.Album = null
				p.OrgPath = null;
				p.MaxPath = BuildImageEncryptionUri(resp.Album.Name, p.Name, "Max");
				p.MiniPath = BuildImageEncryptionUri(resp.Album.Name, p.Name, "Mini");
				p.Name = null;
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
		let albumList = await this.getAlbumList();
		return { initData: { AlbumList: albumList } }
	}

	@Get()
	@RouteRender(RouteConfig.ALBUM.name)
	async Homepage() {
		let albumList = await this.getAlbumList();
		return { initData: { AlbumList: albumList } }
	}

	@Get("/album/:route")
	@RouteRender(RouteConfig.AlbumPictureList.name)
	async AlbumPicture(@Param() params) {

		let name: string[] = Decrypt(params.route).split("-")
		let albumName = name[0];
		let date = name[1];
		if (((new Date().getTime()) - (new Date(date)).getTime()) / (1000 * 60) > 100) {
			throw Redirect("404");
		}

		let resp = await this.getAlbum(albumName)
		return { initData: { ...resp } }
	}
}