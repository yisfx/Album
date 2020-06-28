

import React from "react";
import { AlbumState } from "../store/album.store";
import { MobxIsomorphic } from "../../../framework/MobxIsomorphic";
import { inject, observer } from "mobx-react";

interface Props {
    store?: AlbumState
}

@observer
@inject('store')
export class AlbumList extends React.Component<Props>{
    constructor(props) {
        super(props)
    }
    render() {
        debugger
        return (
            <div>{this.props.store.AlbumList.map(index => {
                return <div>{index}</div>
            })}</div>
        )
    }
}