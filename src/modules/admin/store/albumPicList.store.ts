import React from "react";
import { Album } from "../../../model/album";

export class AlbumPicListState {
    route: string
    Album: Album
}





export type AlbumPicListAction = { type: "init" }
    | { type: "update", state: Partial<AlbumPicListState> }

export type AlbumPicListContextType = {
    state: AlbumPicListState,
    dispatcher: (action: AlbumPicListAction) => Promise<void>
}

export const AlbumPicListContext = React.createContext<AlbumPicListContextType>(undefined);

export function dispatchMiddleWare(next: React.Dispatch<AlbumPicListAction>) {
    return async (action: AlbumPicListAction) => {
        switch (action.type) {
            case "init": next(action); break;
            case "update": next(action); break;
            default: return next(action);
        }
    }
}

export function AlbumPicListReducer(state: AlbumPicListState, action: AlbumPicListAction): AlbumPicListState {
    switch (action.type) {
        case "init":
            return state;
        case "update":
            return { ...state, ...action.state };
    }
}