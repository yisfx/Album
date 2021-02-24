import { HttpClient } from "../../framework/httpclient/http.client";
export declare class DefaultController {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    staticFile(req: any, res: any): void;
    staticPng(req: any, res: any): void;
    albumJpg(req: any, res: any): void;
    staticJpg(req: any, res: any): void;
    ajaxPost(req: any, res: any, route: any): Promise<void>;
}
