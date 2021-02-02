import React, { useContext, useReducer, useState } from "react";
import MasterPage from ".././../../framework/Master/@masterPage";
import AdminMaster from "../../../framework/Master/adminMaster";
import { AlbumPicListContext, AlbumPicListReducer, AlbumPicListState, dispatchMiddleWare } from "../store/albumPicList.store";
import { FxModal } from "../../../framework/components/modal";
import { urlBuilder } from "../../../framework/urlBuilder";
import { PageNameList } from "../../../framework/route.config";
import { Upload } from "../../../framework/components/upload";
import { BaseResponse } from "../../../model/response/baseResponse";
import { Picture } from "../../../model/album";
import { FXImage, ImageType } from "../../../framework/components/fxImage";


function Pic(props: { p: Picture }) {
    return <div>
        <FXImage style={{ width: "100px", height: "100px" }} name={props.p.Name} type={ImageType.Album} desc={undefined} />
    </div>
}

function List() {
    const { state, dispatcher } = useContext(AlbumPicListContext);

    return <div>
        {state.Album?.PicList?.map(p => <div key={p.Name}>{p.MiniPath}</div>)}
    </div>
}

function Top() {
    const { state, dispatcher } = useContext(AlbumPicListContext);
    const [openModal, setOpenModal] = useState(false)
    const [file, setFile] = useState(null);
    return <div>
        <div className="row">
            <div className="row">
                <div className="col-md-8">
                    <div className="page-header">
                        <h1>{state.Album.Name} <small>picture count({state.Album?.PicList?.length || 0})</small></h1>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="page-header">
                        <button className="btn btn-default" type="submit" onClick={() => {
                            window.location.href = urlBuilder(PageNameList.AdminAlbum)
                        }}>Back</button>
                        &nbsp;&nbsp;&nbsp;
                        <button className="btn btn-default" type="submit"
                            onClick={() => { setOpenModal(true) }}
                        >Upload Picture</button>
                    </div>
                </div>
            </div>
        </div>
        <FxModal isOpen={openModal}
            close={() => { setOpenModal(false) }}
        >
            <div>
                <Upload UploadUrl={"/PictureUploadApi"}
                    Success={(response: BaseResponse) => {
                        if (response.Result) {
                            window.location.reload();
                        }
                    }}>
                    <input type="text" readOnly hidden={true} name="AlbumName" value={state.Album.Name} />
                    <input type="file" name="files" onChange={(evt) => {
                        setFile(evt.target.value)
                    }} />
                </Upload>
            </div>
        </FxModal>
    </div>
}

function Content(initalState: AlbumPicListState) {

    const [state, dispatch] = useReducer(AlbumPicListReducer, initalState);

    return <AlbumPicListContext.Provider value={{ state, dispatcher: dispatchMiddleWare(dispatch) }}>
        <Top />
        <List />
    </AlbumPicListContext.Provider>
}

@MasterPage(AdminMaster)
export default class AlbumPicList extends React.Component<AlbumPicListState, any>{
    constructor(props) {
        super(props)
    }
    render() {
        return <Content {...this.props} />
    }
}