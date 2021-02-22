
export const RouteConfig = {
    ALBUM: { name: "album", route: "album", page: "./picture/pages/album.client.tsx" },
    AdminAlbumList: { name: "adminalbum", route: "/admin/album", page: "./admin/pages/album.client.tsx", },
    AdminAlbumPicList: { name: "adminalbumpiclist", route: "/admin/album/:route", page: "./admin/pages/albumpic.client.tsx" }
}

export const PageNameList = {
    Album: "ALBUM",
    AdminAlbum: "AdminAlbumList",
    AdminAlbumPicList: "AdminAlbumPicList"
}

export type PageName = "ALBUM" |
    "AdminAlbumList" |
    "AdminAlbumPicList"


export interface Route {
    route: string
    name: string
    page: string
}