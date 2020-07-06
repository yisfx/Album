import { render } from "react-dom";
import React from "react";
import AlbumList from "../views/albumList";
import { MobxIsomorphic } from "../../../framework/MobxIsomorphic";
import { AlbumState } from "../store/album.store";


@MobxIsomorphic(AlbumState)
export class AlbumPage extends React.Component{
    render(){
        return <AlbumList />;
    }
}

render(
    <AlbumPage />,
    document.getElementById("app")
)


