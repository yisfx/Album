import React, { useContext, useEffect, useReducer, useRef, useState } from "react";
import MasterPage from "../../../framework/master/@masterPage";
import AdminMaster from "../../../framework/master/adminMaster";
import { AlbumPicListContext, AlbumPicListReducer, AlbumPicListState, dispatchMiddleWare } from "../store/albumPicList.store";
import { FXModal } from "../../../framework/components/modal/fxModal";
import { urlBuilder } from "../../../framework/urlBuilder";
import { PageNameList } from "../../../framework/route.config";
import { BaseResponse } from "../../../model/response/baseResponse";
import { Picture, Album } from "../../../model/album";
import { FXImage, ImageType } from "../../../framework/components/fxImage";
import { Ajax } from "../../../framework/httpclient/ajax";
import { DeleteAlbumPictureRequest } from "../../../model/request/deleteAlbumPicRequest";
import { AddAlbumRequest } from "../../../model/request/addAlbumRequest";

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
            <div className="col-xs-4" style={{ wordWrap: "break-word" }}>
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
        <FXModal isOpen={deleteConfirmModal.show}
            showCloseBtn={true}
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

        </FXModal>
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

declare let File: any

function Top() {
    const { state, dispatcher } = useContext(AlbumPicListContext);
    const [openModal, setOpenModal] = useState(false)
    const [file, setFile] = useState({ base64: "", name: "" });
    const [uploadError, setUploadError] = useState("");
    useEffect(() => {
        File.prototype.convertToBase64 = function (callback) {
            var FR = new FileReader();
            FR.onload = function (e) {
                callback(e.target.result)
            };
            FR.readAsDataURL(this);
        }
    }, [])

    const UploadPicture = () => {
        if (!file.name || !file.base64) {
            window.location.reload();
            return;
        }

        Ajax("PictureUploadApi", { ...file, AlbumName: state.Album.Name }).then(resp => {
            if (resp.Result) {
                window.location.reload();
            } else {
                setUploadError(resp.ErrorMessage);
            }
        })
    }



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
        <FXModal showCloseBtn={true} isOpen={openModal}
            close={() => { setFile({ name: "", base64: "" }); setOpenModal(false) }}
        >
            <div>
                {file.name &&
                    <div>
                        <img src={file.base64} style={{ width: "50%", height: "50%", objectFit: "contain" }} />
                        <div>{file.name}</div>
                    </div>
                }

                <input type="file" name='file' onChange={(evt: any) => {
                    let name = evt.target.files[0].size + evt.target.files[0].name;
                    evt.target.files[0].convertToBase64(base64 => {
                        setFile({ base64, name })
                    })
                }} />
                {uploadError &&
                    <div className="alert alert-danger" role="alert">{uploadError}</div>
                }
                <input type="submit" value="上传" onClick={() => {
                    UploadPicture();
                }} />

            </div>
        </FXModal>
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