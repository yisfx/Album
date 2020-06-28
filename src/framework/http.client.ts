import { Injectable } from "@nestjs/common";
import request from "request";

@Injectable()
export class HttpClient {
    constructor() {
    }

    async get(url: string) {
        try {
            let a = await this.createClient()
            return a.body;
        } catch (ex) {
            return "a"
        }
    }


    private async createClient() {
        let resp= await request("https://www.baidu.com",
            {
                method:"POST",
            })
        return resp;
    }
}