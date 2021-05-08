import { Controller, Req, Res, Post, Param } from "@nestjs/common";
import { HttpClient } from "../../framework/httpclient/http.client";
import { BaseResponse } from "../../model/response/baseResponse";


@Controller()
export class DefaultController {
    constructor(private readonly httpClient: HttpClient) {

    }

    @Post("/ajax/api/:route")
    async ajaxPost(@Req() req, @Res() res, @Param("route") route) {
        let response = await this.httpClient.createClient<BaseResponse>(route, req.body)
        res.send(response)
    }
}
