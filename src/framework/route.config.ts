
export const RouteConfig = {
    Page404: { name: "page404", route: "404", page: "" },
    ALBUM: { name: "album", route: "/album", page: "./picture/pages/album.client.tsx" },
    AlbumPictureList: { name: "albumpicturelist", route: "/album/:route", page: "./picture/pages/albumPicture.client.tsx" },

    AdminAlbumList: { name: "adminalbum", route: "/admin/album", page: "./admin/pages/album.client.tsx", },
    AdminAlbumPicList: { name: "adminalbumpiclist", route: "/admin/album/:route", page: "./admin/pages/albumpic.client.tsx" },
    AdminLogin: { name: "adminlogin", route: "/login", page: "./login/pages/login.client.tsx" }
}

export const PageNameList = {
    Album: "ALBUM",
    AdminAlbum: "AdminAlbumList",
    AdminAlbumPicList: "AdminAlbumPicList",
    AlbumPictureList: "AlbumPictureList",
    AdminLogin: "AdminLogin"
}

export type PageName = "ALBUM" |
    "AdminAlbumList" |
    "AdminAlbumPicList" |
    "AlbumPictureList" |
    "AdminLogin"


export interface Route {
    route: string
    name: string
    page: string
}