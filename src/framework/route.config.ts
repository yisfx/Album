
export const RouteConfig = {
    ALBUM: { name: "album", route: "album", page: "./picture/pages/album.client.tsx" },
    AdminAlbumList: { name: "adminalbum", route: "/admin/album", page: "./admin/pages/album.client.tsx", },
    AdminAlbumPicList: { name: "adminalbumpiclist", route: "admin/album/:route", page: "./admin/pages/albumpic.client.tsx" },
    TianYang: { name: "tianyang", route: "/tianyang", page: "./gift/tianyang.client.tsx" },
    MC: { name: "snow", route: "/mc", page: "./gift/tianyang.client.tsx" }

}

export const PageNameList = {
    Album: "ALBUM",
    AdminAlbum: "AdminAlbumList",
    AdminAlbumPicList: "AdminAlbumPicList"
}

export type PageName = string


export interface Route {
    route: string
    name: string
    page: string
}