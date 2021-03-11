
export const RouteConfig = {
    ALBUM: { name: "album", route: "album", page: "./picture/pages/album.client.tsx" },
    AdminAlbumList: { name: "adminalbum", route: "/admin/album", page: "./admin/pages/album.client.tsx", },
    AdminAlbumPicList: { name: "adminalbumpiclist", route: "/admin/album/:route", page: "./admin/pages/albumpic.client.tsx" },
    AlbumPictureList: { name: "albumpicturelist", route: "/album/:route", page: "./picture/pages/albumPicture.client.tsx" }
}

export const PageNameList = {
    Album: "ALBUM",
    AdminAlbum: "AdminAlbumList",
    AdminAlbumPicList: "AdminAlbumPicList",
    AlbumPictureList: "AlbumPictureList"
}

export type PageName = "ALBUM" |
    "AdminAlbumList" |
    "AdminAlbumPicList" |
    "AlbumPictureList"


export interface Route {
    route: string
    name: string
    page: string
}