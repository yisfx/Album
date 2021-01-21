

import React, { useContext, useReducer, useState } from "react";
import { AlbumContext, AlbumReducer, AlbumState, dispatchMiddleWare } from "../store/album.store";
import AdminMaster from "../../../framework/Master/adminMaster";
import MasterPage from "../../../framework/Master/@masterPage";
import { FxModal } from "../../../framework/components/modal";


interface IProps {
    store?: AlbumState
}

function Top() {
    const { state, dispatcher } = useContext(AlbumContext)
    const [isOpen, setIsOpen] = useState(false);
    return <div className="row">
        <div style={{ marginTop: "100px" }}></div>
        <div className="col-md-8">
        </div>
        <div className="col-md-2">
            <button
                type="button"
                className="btn btn-info"
                onClick={() => {
                    setIsOpen(true)
                }}
            >Create Album</button>
        </div>
        <FxModal
            isOpen={isOpen}
            close={() => { setIsOpen(false) }}
        >
            <form>
                <div className="row">
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" placeholder="Name" value={""} />
                    </div>
                    <div className="form-group">
                        <label>DateTime</label>
                        <input type="text" className="form-control" placeholder="DateTime" />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea className="form-control" placeholder="Description"></textarea>
                    </div>
                </div>
            </form>
        </FxModal>
    </div>
}

function Content(initalState: AlbumState) {

    const [state, dispatch] = useReducer(AlbumReducer, initalState);

    return <>
        <AlbumContext.Provider value={{ state, dispatcher: dispatchMiddleWare(dispatch) }}>
            <Top />
        </AlbumContext.Provider>
    </>
}



@MasterPage(AdminMaster)
export default class AlbumListPage extends React.Component<IProps, any> {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Content {...this.props.store} />

        )
    }
}