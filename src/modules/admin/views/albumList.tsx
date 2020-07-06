

import React, { useReducer } from "react";
import { AlbumState, AlbumStateReducer } from "../store/album.store";
import { Album } from "../admin.model";
import { inject, observer } from "mobx-react";

interface IProps{
    store?:AlbumState
}


@inject('store')
@observer
export default class AlbumList extends React.Component<IProps,any> {
    constructor(props) {
        super(props)

        
    }
    render() {
        // let a: Album = {
        //     AlbumName: "a",
        //     ImageCount: 1,
        //     Describe: "d",
        //     Cover: "a.jpg"
        // }
        // let list: AlbumState = { AlbumList: [] }
        // list.AlbumList.push(a);

        // const [state, dispatch] = useReducer(AlbumStateReducer, list);

        debugger
        return (

            <div>{this.props.store.AlbumList.map(index => {
                return <div key={index.AlbumName} onClick={() => {
                    // dispatch({ action: "albumname", name: index.AlbumName })
                }}>{index.AlbumName}</div>
            })}</div>
        )
    }
}