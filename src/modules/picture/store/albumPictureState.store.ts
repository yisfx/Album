import React from "react";
import { Album } from "../../../model/album";

export interface AlbumPictureState {
    Album: Album
}

export type AlbumPictureAction = { action: "init", }
    | { action: "update", data: Partial<AlbumPictureState> }

export type AlbumPictureContextType = {
    state: AlbumPictureState,
    dispatcher: React.Dispatch<AlbumPictureAction>
}

export const AlbumPictureContext = React.createContext<AlbumPictureContextType>(undefined);


export function AlbumPictureReducer(state: AlbumPictureState, action: AlbumPictureAction) {
    switch (action.action) {
        case "init":
            return { ...state }
        case "update":
            return { ...state, ...action.data }
    }
}