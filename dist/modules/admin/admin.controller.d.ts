export declare class AdminController {
    constructor();
    Album(): Promise<{
        initData: {
            AlbumList: {
                AlbumName: string;
                ImageCount: number;
                Describe: string;
                Cover: string;
            }[];
        };
    }>;
    AlbumList(): Promise<void>;
}
