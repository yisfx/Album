import React, { useContext, useEffect, useReducer, useState } from "react";
import MasterPage from "../../../framework/master/@masterPage";
import AdminMaster from "../../../framework/master/adminMaster";
import { AlbumPicListContext, AlbumPicListReducer, AlbumPicListState, dispatchMiddleWare } from "../store/albumPicList.store";
import { FxModal } from "../../../framework/components/modal";
import { urlBuilder } from "../../../framework/urlBuilder";
import { PageNameList } from "../../../framework/route.config";
import { Upload } from "../../../framework/components/upload";
import { BaseResponse } from "../../../model/response/baseResponse";
import { Picture, Album } from "../../../model/album";
import { FXImage, ImageType } from "../../../framework/components/fxImage";
import { Ajax } from "../../../framework/httpclient/ajax";
import { DeleteAlbumPictureRequest } from "src/model/request/deleteAlbumPicRequest";
import { AddAlbumRequest } from "src/model/request/addAlbumRequest";

declare let File: any

enum DeleteType {
    Image = "Image",
    Abbreviation = "Abbreviation"
}

function Pic(props: { p: Picture, album: Album }) {

    const [deleteConfirmModal, setDeleteConfirmModal] = useState({ show: false, deleteType: DeleteType.Abbreviation, ErrorMsg: "" });

    const DeleteImage = () => {
        Ajax<DeleteAlbumPictureRequest>("deleteAlbumPicApi",
            { AlbumName: props.p.Album, PicName: props.p.Name, DeleteType: deleteConfirmModal.deleteType }).then((resp: BaseResponse) => {
                if (resp.Result) {
                    window.location.reload()
                } else {
                    setDeleteConfirmModal({ ...deleteConfirmModal, ErrorMsg: resp.ErrorMessage })
                }
            })
    }
    const SetAlbumCover = () => {
        Ajax<AddAlbumRequest>("AddAlbumApi",
            { Album: { ...props.album, Cover: props.p.Name } }).then((resp: BaseResponse) => {
                if (resp.Result) {
                    window.location.reload();
                }
            });
    }

    return <div>
        <div className="row">
            <div className="col-xs-2">
                <div className="thumbnail">
                    <FXImage style={{ width: "200px", height: "200px", objectFit: "contain" }}
                        name={`${props.p.Album}-${props.p.Name}-mini.jpg`}
                        type={ImageType.Album}
                        desc={undefined} />
                </div>
            </div>
            <div className="col-xs-4">
                {props.p.Name}
            </div>
            <div className="col-xs-4">
                <button onClick={() => {
                    setDeleteConfirmModal({ show: true, deleteType: DeleteType.Image, ErrorMsg: "" })
                }} className="btn">delete image</button>
                <br /><br />
                <button onClick={() => {
                    setDeleteConfirmModal({ show: true, deleteType: DeleteType.Abbreviation, ErrorMsg: "" })
                }} className="btn">delete max & mini</button>
                <br /><br />
                {props.album.Cover !== props.p.Name &&
                    <button onClick={() => {
                        SetAlbumCover()
                    }} className="btn">set album cover</button>
                }
                {props.album.Cover === props.p.Name &&
                    <div>
                        Is Cover <i className="glyphicon glyphicon-ok" />
                    </div>
                }
            </div>
        </div>
        <FxModal isOpen={deleteConfirmModal.show}
            close={() => { setDeleteConfirmModal({ show: false, deleteType: DeleteType.Abbreviation, ErrorMsg: "" }) }}>
            <div className="row">
                <div className="col-sm-2"></div> <div>are you sure delete this {deleteConfirmModal.deleteType}？</div>
            </div>
            <div className="thumbnail">
                <FXImage style={{ height: "250px", objectFit: "contain" }} name={`${props.p.Album}-${props.p.Name}-mini.jpg`} type={ImageType.Album} desc={undefined} />
            </div>
            <div className="row">
                <div className="col-sm-2"></div>
                <div className="col-sm-2">
                    <button onClick={() => {
                        DeleteImage()
                    }}> SURE </button>
                </div>
                <div className="col-sm-2"></div>
                <div className="col-sm-2"></div>
                <div className="col-sm-2">
                    <button onClick={() => {
                        setDeleteConfirmModal({ show: false, deleteType: DeleteType.Abbreviation, ErrorMsg: "" })
                    }}> NO </button>
                </div>
            </div>

        </FxModal>
    </div>
}

function List() {
    const { state, dispatcher } = useContext(AlbumPicListContext);
    const album = { ...state.Album, PicList: null }
    return <div>
        {state.Album?.PicList?.map(p => <div key={p.Name}>
            <Pic p={p} album={album} />
        </div>)}
    </div>
}

function Top() {
    const { state, dispatcher } = useContext(AlbumPicListContext);
    const [openModal, setOpenModal] = useState(false)
    const [file, setFile] = useState(null);

    useEffect(() => {
        File.prototype.convertToBase64 = function (callback) {
            var FR = new FileReader();
            FR.onload = function (e) {
                callback(e.target.result)
            };
            FR.readAsDataURL(this);
        }
    }, [])


    return <div>
        <div className="row">
            <div className="row">
                <div className="col-md-8">
                    <div className="page-header">
                        <h1>{state.Album.Name}-{state.Album.CNName} <small>picture count({state.Album?.PicList?.length || 0})</small></h1>
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
                    {file &&
                        <img src={`data:image/jpg;base64,${file}`} />
                    }
                    <input type="text" readOnly hidden={true} name="AlbumName" value={state.Album.Name} />
                    <input type="file" name="files" onChange={(evt: any) => {
                        evt.target.files[0].convertToBase64(base64 => {
                            setFile(base64)
                        })
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