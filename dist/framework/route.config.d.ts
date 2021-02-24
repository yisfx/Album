export declare const RouteConfig: {
    ALBUM: {
        name: string;
        route: string;
        page: string;
    };
    AdminAlbumList: {
        name: string;
        route: string;
        page: string;
    };
    AdminAlbumPicList: {
        name: string;
        route: string;
        page: string;
    };
};
export declare const PageNameList: {
    Album: string;
    AdminAlbum: string;
    AdminAlbumPicList: string;
};
export declare type PageName = "ALBUM" | "AdminAlbumList" | "AdminAlbumPicList";
export interface Route {
    route: string;
    name: string;
    page: string;
}
