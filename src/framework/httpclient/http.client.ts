import { Injectable } from "@nestjs/common";

import request from "request";
import { RestfulService, ServiceHost } from "../../conf/restful.service";

@Injectable()
export class HttpClient {
    constructor() {
    }

    public async get(url: string) {
        try {
            let a = await this.createClient(url)
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

        return new Promise((resolve, reject) => {
            try {
                request(uri,
                    {
                        method: "GET",
                        timeout: 5000
                    }, (err, response, body) => {
                        if (!!err) {
                            reject(err)
                        } else {
                            resolve(JSON.parse((body as string)))
                        }
                    })
            } catch (ex) {
                return {}
            }
        })

    }


}