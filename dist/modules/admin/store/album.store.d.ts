import React from "react";
import { Album } from "../../../model/album";
export declare class AlbumState {
    AlbumList: Album[];
    a: number;
}
export declare type AlbumAction = {
    type: "init";
};
export declare type AlbumContextType = {
    state?: AlbumState;
    dispatcher?: (action: AlbumAction) => Promise<void>;
};
export declare const AlbumContext: React.Context<AlbumContextType>;
export declare const dispatchMiddleWare: (next: React.Dispatch<AlbumAction>) => (action: AlbumAction) => Promise<void>;
export declare function AlbumReducer(state: AlbumState, action: AlbumAction): AlbumState;
