import { HttpClient } from '../../framework/http.client';
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
