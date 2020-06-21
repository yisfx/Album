import { Album } from "../modules/picture/views/album";

export const RouteConfig={
    ALBUM:{name:"album",page:"./picture/pages/album.client.tsx"}
}

export interface Route{
    name:string
    page:string

}