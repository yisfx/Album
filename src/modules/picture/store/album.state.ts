import { Album } from "../../../model/album";

export interface AlbumState {
    AlbumList: { [key: string]: Album[] }
}