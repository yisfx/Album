import React from "react";
import { AlbumState } from "../store/album.store";
interface IProps {
    store?: AlbumState;
}
export default class AlbumList extends React.Component<IProps, any> {
    constructor(props: any);
    render(): JSX.Element;
}
export {};
