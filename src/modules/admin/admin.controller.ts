import { Body, Controller, Get, Param, Post, Req, Res, UseGuards, UseInterceptors } from "@nestjs/common";
import { RouteRender } from "../../framework/decorators/RouteRender.decorator";
import { RouteConfig } from "../../framework/route.config";
import { HttpClient } from "../../framework/httpclient/http.client";
import { AlbumListResponse } from "../../model/response/albumListResponse";
import { GetAlbumRequest } from "../../model/request/getAlbumRequest";
import { GetAlbumResponse } from "../../model/response/getAlbumResponse";
import { FastifyReply, FastifyRequest } from "fastify";
import { LayoutInterceptor } from "../../framework/interceptor/layout.Interceptor";
import fs from "fs";
import path from "path";
import { LoginGuard } from "../../framework/guards/login.guard";
import { BaseResponse } from "../../model/response/baseResponse";
import { GetAllYearsResponse } from "../../model/response/getAllYearsResponse";

@Controller()
@UseInterceptors(LayoutInterceptor)
@UseGuards(LoginGuard)
export class AdminController {
    constructor(private readonly httpClient: HttpClient) {
    }

    @Get(RouteConfig.AdminAlbumList.route)
    @RouteRender(RouteConfig.AdminAlbumList.name)
    async Album(@Req() request: FastifyRequest) {
        let curYear: number = request.query["year"]
        let yearListResponse = await this.httpClient.createClient<GetAllYearsResponse>("getAllYears");
        if (!curYear) {
            curYear = yearListResponse.AllYears.sort((a, b) => a - b)[0]
        }
        let resp = await this.httpClient.createClient<AlbumListResponse>("getAlbumListByYear", { Year: curYear });
        return {
            initData: { ...resp, YearList: yearListResponse.AllYears.sort((a, b) => a - b), CurrentYear: curYear }
        }
    }

    @Get(RouteConfig.AdminAlbumPicList.route)
    @RouteRender(RouteConfig.AdminAlbumPicList.name)
    async AlbumPicList(@Param("route") route) {
        let request: GetAlbumRequest = { AlbumName: route }
        let resp = await this.httpClient.createClient<GetAlbumResponse>("getAlbumPicApi", request);
        resp.Album.PicList?.map(d => { d.MaxPath = d.MiniPath = d.OrgPath = undefined });
        return { initData: { ...resp } }
    }

    @Post("/ajax/api/PictureUploadApi")
    async PictureUpload(@Res() response: FastifyReply, @Body() body: { base64: string, AlbumName: string, name: string }) {

        if (!body?.AlbumName || !body?.base64 || !body?.name) {
            response.status(500).send({ Result: false, ErrorMessage: "bad request" })
        }
        if (!body.base64.startsWith("data:image/jpeg;base64,")) {
            response.status(500).send({ Result: false, ErrorMessage: "bad request" })
        }

        let request: GetAlbumRequest = { AlbumName: body["AlbumName"] }

        let album = await this.httpClient.createClient<GetAlbumResponse>("getAlbumPicApi", request);
        if (album.Album?.PicList?.find((p) => p.Name === body.name)) {
            response.send({ Result: false, ErrorMessage: "Exists Picture" })
        }

        ///save
        let base64Data = body.base64.replace(/^data:image\/\w+;base64,/, "");
        let dataBuffer = Buffer.from(base64Data, 'base64');
        let name = (body.name).split(".")

        let fileName = path.join(album.Album.Path, (album.Album.Name + "-" + name[0] + "-org." + name[1]).toLocaleLowerCase());
        await this.httpClient.createClient<BaseResponse>("uploadImage", { AlbumName: body.AlbumName, PictureName: album.Album.Name + "-" + name[0] });
        fs.writeFileSync(fileName, dataBuffer)
        response.send({ Result: true })
    }
}