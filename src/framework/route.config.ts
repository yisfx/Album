
export const RouteConfig = {
    ALBUM: { name: "album", route: "album", page: "./picture/pages/album.client.tsx" },
    AdminAlbum: { name: "adminalbum", route: "/admin/album", page: "./admin/pages/album.client.tsx", }
}

export interface Route {
    route: string
    name: string
    page: string
}