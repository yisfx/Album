

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
                <button onClick={() => {
                    this.props.store.a++
                }}>aaa{this.props.store.a}</button>

            </div>
        )
    }
}