import { Injectable } from "@nestjs/common";

import request from "request";
import { RestfulService, ServiceHost } from "../conf/restful.service";
import * as http from "http";

@Injectable()
export class HttpClient {
    constructor() {
    }

    public async get(url: string) {
        try {
            let a = await this.createClient("")
            return a;
        } catch (ex) {
            return "a"
        }
    }
    public async createClient<T>(api: string): Promise<T> {
        let restful = RestfulService[api]
        if (!restful) {
            throw Error("error api:" + api)
        }
        let host = ServiceHost[restful.Service]
        if (!host) {
            throw Error("error service:" + restful.Service)
        }
        let uri: string
        if (!host.endsWith("/") && !restful.URL.endsWith("/")) {
            uri = host + "/" + restful.URL;
        } else {
            uri = host + restful.URL
        }

        let rrr = await http.request(uri);
        http.

        let resp = await request(uri,
            {
                method: "GET",
            })
        let result: T = JSON.parse((resp.body as string))
        return result;
    }
}