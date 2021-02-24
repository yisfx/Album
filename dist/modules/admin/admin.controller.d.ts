import { HttpClient } from "../../framework/httpclient/http.client";
export declare class AdminController {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    Album(): Promise<{
        initData: {
            AlbumList: import("../../model/album").Album[];
            Result: boolean;
            ErrorMessage: string;
        };
    }>;
    AlbumPicList(route: any): Promise<{
        initData: {
            Album: import("../../model/album").Album;
        };
    }>;
    PictureUpload(response: any, files: any, body: any): Promise<void>;
}
