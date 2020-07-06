

import React from "react";
import { observable, observe } from "mobx";
import { AlbumState } from "../store/album.store";
import { Album } from "../admin.model";
import { inject, observer } from "mobx-react";


interface IProps {
    store?: AlbumState
}


@inject('store')
@observer
export default class AlbumList extends React.Component<IProps, any> {

    @observable a=0
    constructor(props) {
        super(props)
    }
    render() {
        return (

            <div>
                <button onClick={() => {
                    this.a++
                }}>aaa{this.a}</button>
                
            </div>
        )
    }
}