import { render } from "react-dom";
import React from "react";
import AlbumPicList from "../views/albumPicList";
import { AlbumPicListState } from "../store/albumPicList.store";


export class AlbumPicListPage extends React.Component {
    render() {
        return <AlbumPicList {...(this.props as any)} />;
    }
}

let readtData: AlbumPicListState = window["__reactData__"]
render(
    <AlbumPicListPage {...readtData} />,
    document.getElementById("app")
)


