import { YearAlbumList } from "../../../model/response/getAllYearsResponse";
import { Album } from "../../../model/album";

export interface AlbumState {
    AlbumList: Album[]
    YearList: YearAlbumList[]
    CurrentYear: number
}

