import React, { useContext } from "react"
import MasterPage from "../../../framework/Master/@masterPage"
import Master from "../../../framework/Master/master"
import { AlbumPictureContext, AlbumPictureReducer, AlbumPictureState } from "../store/AlbumPictureState.store"




function Top() {
    const { state, dispatcher } = useContext(AlbumPictureContext)
    debugger
    return <div className="page-header">
        <h3>{state.Album.Name}
            <br />
            <small>{state.Album.Description}</small>
        </h3>
    </div>
}

function Content(initalState: AlbumPictureState) {

    const [state, dispatcher] = React.useReducer(AlbumPictureReducer, initalState)

    return <AlbumPictureContext.Provider value={{ state, dispatcher }}>
        <Top />
    </AlbumPictureContext.Provider>
}


@MasterPage(Master)
export class AlbumPicturePage extends React.Component<AlbumPictureState, any>{
    constructor(props) {
        super(props)
    }
    render() {
        return <div className="container">
            <Content {...this.props} />
        </div>
    }
}