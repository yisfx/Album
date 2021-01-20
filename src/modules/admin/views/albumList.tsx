

import React from "react";
import { AlbumState } from "../store/album.store";
import { inject, observer } from "mobx-react";
import AdminMaster from "../../../framework/Master/AdminMaster";


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
            <AdminMaster>
                <div className="row">
                    <div style={{ marginTop: "100px" }}></div>
                    <div className="col-md-8">
                    </div>
                    <div className="col-md-2">
                        <button type="button" className="btn btn-info" 
                        onClick={()=>{
                            
                        }}
                        >New Album</button>
                    </div>
                </div>
            </AdminMaster>
        )
    }
}