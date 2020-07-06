import { Album } from "../admin.model";

export class AlbumState {
    public AlbumList: Album[]
}


export type AlbumAction =
    { action: "albumname", name: string }


export function AlbumStateReducer(state: AlbumState, action: AlbumAction): AlbumState {

    switch(action.action){
        case "albumname":
            
            return state;
    }

    return state
}