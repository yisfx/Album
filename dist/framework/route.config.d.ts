export declare const RouteConfig: {
    ALBUM: {
        name: string;
        route: string;
        page: string;
    };
    AdminAlbum: {
        name: string;
        route: string;
        page: string;
    };
    TianYang: {
        name: string;
        route: string;
        page: string;
    };
    MC: {
        name: string;
        route: string;
        page: string;
    };
};
export declare const PageNameList: {
    Album: string;
    AdminAlbum: string;
};
export declare type PageName = string;
export interface Route {
    route: string;
    name: string;
    page: string;
}
