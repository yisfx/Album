import { HttpClient } from "../../framework/http.client";
export declare class DefaultController {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    staticFile(req: any, res: any): any;
    staticImage(req: any, res: any): any;
    ajax(req: any, res: any): any;
}
