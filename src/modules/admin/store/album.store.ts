import { Album } from "../admin.model";
import { observable } from "mobx";

export class AlbumState {
    public AlbumList: Album[]

    @observable public a: number = 0
}
