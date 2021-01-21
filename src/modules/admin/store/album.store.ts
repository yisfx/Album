import { Album } from "../admin.model";
import { action, observable } from "mobx";
import React from "react";

export class AlbumState {
    public AlbumList: Album[]

    @observable public a: number = 0
}

export type AlbumAction = { type: "init" }

export type AlbumContextType = {
    state?: AlbumState,
    dispatcher?: (action: AlbumAction) => Promise<void>
}

export const AlbumContext = React.createContext<AlbumContextType>({})

export const dispatchMiddleWare = (next: React.Dispatch<AlbumAction>) => {
    return async (action: AlbumAction) => {
        switch (action.type) {
            case "init": next(action)
                break;
        }
    }
}


export function AlbumReducer(state: AlbumState, action: AlbumAction): AlbumState {
    switch (action.type) {
        case "init":
            return { ...state };
    }
}