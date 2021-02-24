import { HttpClient } from '../../framework/httpclient/http.client';
export declare class AlbumController {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    getHello(): Promise<{
        initData: {
            a: string;
            b: string;
        };
    }>;
    Main(): Promise<{
        initData: {
            a: string;
            b: string;
        };
    }>;
}
