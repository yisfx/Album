import { Controller, Get, Param, Redirect, UseInterceptors } from '@nestjs/common';
import { RouteRender } from '../../framework/decorators/RouteRender.decorator';
import { RouteConfig } from '../../framework/route.config';
import { HttpClient } from '../../framework/httpclient/http.client';
import { AlbumListResponse } from '../../model/response/albumListResponse';
import { GetAlbumRequest } from '../../model/request/getAlbumRequest';
import { GetAlbumResponse } from '../../model/response/getAlbumResponse';
import { BuildMenu } from './utils/menu-tool';
import { Album } from '../../model/album';
import { LayoutInterceptor } from '../../framework/interceptor/layout.Interceptor';
import { GetAllYearsResponse } from '../../model/response/getAllYearsResponse';

@Controller()
@UseInterceptors(LayoutInterceptor)
export class AlbumController {
	constructor(private readonly httpClient: HttpClient) { }

	async getAlbumList(year: number): Promise<Album[]> {

		const resp = await this.httpClient.createClient<AlbumListResponse>("getEntryAlbumListByYearApi", { Year: year.toString() });

		return resp.AlbumList
	}

	async getAlbum(albumName: string): Promise<GetAlbumResponse> {
		const request: GetAlbumRequest = { AlbumName: albumName }
		return await this.httpClient.createClient<GetAlbumResponse>("getEntryAlbumPicListApi", request);

	}

	@Get(RouteConfig.ALBUM.route)
	@RouteRender(RouteConfig.ALBUM.name)
	async getHello() {
		///yearList
		const yearListResponse = await this.httpClient.createClient<GetAllYearsResponse>("getAllYears");

		const yearList = yearListResponse.AllYears.sort((a, b) => b.Year - a.Year)

		if (yearList && yearList.length <= 0) {
			return { initData: { AlbumList: [], YearList: [], CurrentYear: 0 } }
		}
		let albumList = await this.getAlbumList(yearList[0].Year);

		if (albumList && albumList.length > 5) {
			albumList = albumList.slice(0, 5);
		}


		return { initData: { AlbumList: albumList, YearList: yearList, CurrentYear: yearList[0].Year } }
	}

	@Get()
	@RouteRender(RouteConfig.ALBUM.name)
	async Homepage() {

		///yearList
		const yearListResponse = await this.httpClient.createClient<GetAllYearsResponse>("getAllYears");

		const yearList = yearListResponse.AllYears.sort((a, b) => b.Year - a.Year)

		if (yearList && yearList.length <= 0) {
			return { initData: { AlbumList: [], YearList: [], CurrentYear: 0 } }
		}
		let albumList = await this.getAlbumList(yearList[0].Year);

		if (albumList && albumList.length > 5) {
			albumList = albumList.slice(0, 5);
		}


		return { initData: { AlbumList: albumList, YearList: yearList, CurrentYear: yearList[0].Year } }
	}

	@Get("/album/:route")
	@RouteRender(RouteConfig.AlbumPictureList.name)
	async AlbumPicture(@Param() params) {
		try {
			const resp = await this.getAlbum(params.route)

			if (!resp.Result) {
				throw Redirect("404");
			}

			return { initData: { ...resp } }
		} catch (ex) {
			console.log(ex)
		}
	}
}