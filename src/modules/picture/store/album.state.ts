import { Album } from "../../../model/album";

export interface AlbumState {
    AlbumList: Album[]
    YearList: number[]
    CurrentYear: number
}