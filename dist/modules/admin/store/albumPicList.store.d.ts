import React from "react";
import { Album } from "../../../model/album";
export declare class AlbumPicListState {
    route: string;
    Album: Album;
}
export declare type AlbumPicListAction = {
    type: "init";
} | {
    type: "update";
    state: Partial<AlbumPicListState>;
};
export declare type AlbumPicListContextType = {
    state: AlbumPicListState;
    dispatcher: (action: AlbumPicListAction) => Promise<void>;
};
export declare const AlbumPicListContext: React.Context<AlbumPicListContextType>;
export declare function dispatchMiddleWare(next: React.Dispatch<AlbumPicListAction>): (action: AlbumPicListAction) => Promise<void>;
export declare function AlbumPicListReducer(state: AlbumPicListState, action: AlbumPicListAction): AlbumPicListState;
