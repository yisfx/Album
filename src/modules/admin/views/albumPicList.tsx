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
import { Ajax } from "../../../framework/httpclient/ajax";

enum DeleteType {
    Image = "Image",
    Abbreviation = "Abbreviation"
}

function Pic(props: { p: Picture }) {

    const [deleteConfirmModal, setDeleteConfirmModal] = useState({ show: false, deleteType: DeleteType.Abbreviation });

    const DeleteImage = () => {
        Ajax("", {})

    }

    return <div>
        <div className="row">
            <div className="col-xs-2">
                <div className="thumbnail">
                    <FXImage style={{ width: "200px", height: "200px", objectFit: "contain" }} name={`${props.p.Album}-${props.p.Name}-mini.jpg`} type={ImageType.Album} desc={undefined} />
                </div>
            </div>
            <div className="col-xs-4">
                {props.p.Name}
            </div>
            <div className="col-xs-4">
                <button onClick={() => {
                    setDeleteConfirmModal({ show: true, deleteType: DeleteType.Image })
                }} className="btn">delete image</button>
                <br /><br />
                <button onClick={() => {
                    setDeleteConfirmModal({ show: true, deleteType: DeleteType.Abbreviation })
                }} className="btn">delete max & mini</button>
            </div>
        </div>
        <FxModal isOpen={deleteConfirmModal.show}
            close={() => { setDeleteConfirmModal({ show: false, deleteType: DeleteType.Abbreviation }) }}>
            <div className="row">
                <div className="col-sm-2"></div> <div>are you sure delete this {deleteConfirmModal.deleteType}？</div>
            </div>
            <div className="thumbnail">
                <FXImage style={{ height: "250px", objectFit: "contain" }} name={`${props.p.Album}-${props.p.Name}-mini.jpg`} type={ImageType.Album} desc={undefined} />
            </div>
            <div className="row">
                <div className="col-sm-2"></div>
                <div className="col-sm-2"><button> SURE </button></div>
                <div className="col-sm-2"></div>
                <div className="col-sm-2"></div>
                <div className="col-sm-2"><button onClick={() => {
                    setDeleteConfirmModal({ show: false, deleteType: DeleteType.Abbreviation })
                }}> NO </button></div>
            </div>

        </FxModal>
    </div>
}

function List() {
    const { state, dispatcher } = useContext(AlbumPicListContext);

    return <div>
        {state.Album?.PicList?.map(p => <div key={p.Name}>
            <Pic p={p} />
        </div>)}
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
                        &nbsp;&nbsp;&nbsp;
                        <button className="btn btn-default" type="submit"
                            onClick={() => {
                                Ajax("rebuildAlbumApi", { AlbumName: state.Album.Name }).then(resp => {
                                    if (resp?.Result)
                                        alert("done")
                                })
                            }}
                        >Rebuild</button>
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