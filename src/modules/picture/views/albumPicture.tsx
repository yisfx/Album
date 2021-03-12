import React from "react"
import MasterPage from "../../../framework/Master/@masterPage"
import Master from "../../../framework/Master/master"
import { AlbumPictureState } from "../store/AlbumPictureState.store"



@MasterPage(Master)
export class AlbumPicturePage extends React.Component<AlbumPictureState, any>{
    constructor(props) {
        super(props)
    }
    render() {
        return <div>
            {this.props.Album.Description}
        </div>
    }
}