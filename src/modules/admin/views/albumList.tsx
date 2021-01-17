

import React from "react";
import { AlbumState } from "../store/album.store";
import { inject, observer } from "mobx-react";


interface IProps {
    store?: AlbumState
}


@inject('store')
@observer
export default class AlbumList extends React.Component<IProps, any> {

    constructor(props) {
        super(props)
    }
    render() {
        return (

            <div>
                {this.props.store.AlbumList?.length}
                <button onClick={() => {

                }}>aaa</button>

            </div>
        )
    }
}