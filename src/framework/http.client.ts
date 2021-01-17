import { Injectable } from "@nestjs/common";
import { exception } from "console";
import request from "request";
import { RestfulService, ServiceHost } from "../conf/restful.service";
import * as url from "url";

@Injectable()
export class HttpClient {
    constructor() {
    }

    public async get(url: string) {
        try {
            let a = await this.createClient("")
            return a.body;
        } catch (ex) {
            return "a"
        }
    }
    public async createClient(api: string) {
        let restful = RestfulService[api]
        if (!restful) {
            throw exception("error api:" + api)
        }
        let host = ServiceHost[restful.Service]
        if (!host) {
            throw exception("error service:" + restful.Service)
        }
        let uri: string
        if (!host.endsWith("/") && !restful.URL.endsWith("/")) {
            uri = host + "/" + restful.URL;
        } else {
            uri = host + restful.URL
        }
        let resp = await request(uri,
            {
                method: "POST",
            })
        return resp;
    }
}