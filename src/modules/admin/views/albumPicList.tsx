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
import { ConvertToQePic, PopupPic, QeImage } from "../../../framework/components/queue-image-load";

enum DeleteType {
    Image = "Image",
    Abbreviation = "Abbreviation"
}

function Pic(props: { p: Picture, album: Album, CurrentLoad: string, LoadEnd: (isSccess: boolean) => void }) {

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
                    <QeImage style={{ width: "200px", height: "200px", objectFit: "contain" }}
                        name={`${props.p.Name}-mini.jpg`}
                        type={ImageType.Album}
                        currentPicName={props.CurrentLoad}
                        LoadEnd={props.LoadEnd}
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
                <FXImage style={{ height: "250px", objectFit: "contain" }}
                    name={`${props.p.Name}-mini.jpg`}
                    type={ImageType.Album}
                    desc={undefined}
                />
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

    const [curLoadImage, setCurLoadImage] = useState("");
    const [qePicList, setQePicList] = useState([]);
    useEffect(() => {
        const sss = ConvertToQePic(state.Album.PicList.map(d => d.Name))
        setQePicList(sss);
        let result = PopupPic(sss, "")
        result?.next && setCurLoadImage(result.next)
        result?.curList && setQePicList(result.curList);
    }, [])


    return <div>
        {state.Album?.PicList?.map(p => <div key={p.Name}>
            <Pic p={p}
                album={album}
                CurrentLoad={`${p.Name}-mini.jpg`}
                LoadEnd={() => {
                    let result = PopupPic(qePicList, p.Name)
                    result?.next && setCurLoadImage(result.next)
                    result?.curList && setQePicList(result.curList);
                }} />
        </div>)}
    </div>
}

declare let File: any
const preCount = 80000


function UploadCell(props: { Album: Album, Index: number, StartUpload: boolean, UpLoadEndCallBack: (index: number) => void, Delete: (index: number) => void }) {

    const [file, setFile] = useState({ base64: "", name: "" });
    const [uploadError, setUploadError] = useState("");
    const [uploadState, SetUploadState] = useState(0)


    useEffect(() => {
        if (props.StartUpload) {
            UploadPicture();
        }
    }, [props.StartUpload])



    const upload = async (part: string, partIndex: number, isLast: boolean) => {
        let request: PicturePartUploadRequest = {
            PartIndex: partIndex,
            Value: part,
            IsLastPart: isLast,
            PictureName: file.name,
            AlbumName: props.Album.Name
        }
        if (!isLast) {
            Ajax("uploadImagePartApi", request).then(res => {
                let pre = file.base64.substr((partIndex + 1) * preCount, preCount)
                SetUploadState(partIndex + 1);
                upload(pre, partIndex + 1, !pre);
            })
        } else {
            Ajax("uploadImagePartApi", request).then(res => {
                props.UpLoadEndCallBack(props.Index)
            })
        }
    }

    const UploadPicture = async () => {
        if (!file.name || !file.base64) {
            props.UpLoadEndCallBack(props.Index)
            return;
        }

        let count = file.base64.length / 80000;

        if (count < 2) {
            await upload(file.base64, 0, true)
            return;
        }
        SetUploadState(0);
        let pre = file.base64.substr(0, preCount)
        upload(pre, 0, !pre);
    }


    return <>
        <div>
            {file.name &&
                <div>
                    <img src={`data:image/jpeg;base64,${file.base64}`} style={{ width: "50%", height: "50%", objectFit: "contain" }} />
                    <div>{file.name}</div>
                </div>
            }

            <input type="file" name='file' onChange={(evt: any) => {
                let name: string = evt.target.files[0].size + evt.target.files[0].name;
                evt.target.files[0].convertToBase64((base64: string) => {
                    setFile({
                        base64: base64.replace("data:image/jpeg;base64,", ""),
                        name: name.toLocaleLowerCase().replace(".jpg", "")
                    })
                })
            }} />

            {uploadError &&
                <div className="alert alert-danger" role="alert">{uploadError}</div>
            }
            <input type="button" value="Delete" onClick={() => { props.Delete(props.Index) }} />
            {uploadState > 0 &&
                <div>{uploadState}</div>
            }
        </div>


    </>
}

function Top() {
    const { state, dispatcher } = useContext(AlbumPicListContext);
    const [openModal, setOpenModal] = useState(false)
    let fileListTemp: {
        CurrIndex: number
        Files: { Index: number, IsUpload: boolean }[]
    }
    const [fileList, setFileList] = useState(fileListTemp)

    useEffect(() => {
        File.prototype.convertToBase64 = function (callback) {
            var FR = new FileReader();
            FR.onload = function (e) {
                callback(e.target.result)
            };
            FR.readAsDataURL(this);
        }
        if (!fileList?.Files || fileList.Files.length < 1) {
            setFileList({ CurrIndex: 1, Files: [{ Index: 1, IsUpload: false }] })
        }
    }, [])


    const StartUpload = (index: number) => {
        let preUploadList = fileList.Files.filter(file => !file.IsUpload && file.Index !== index)
        if (!preUploadList || preUploadList.length < 1) {
            alert("done")
            window.location.reload();
        }
        preUploadList[0].IsUpload = true;
        setFileList({ CurrIndex: fileList.CurrIndex, Files: [...preUploadList] })
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
                                    if (resp?.Result) {
                                        alert("done")
                                        window.location.reload();
                                    }
                                })
                            }}
                        >Rebuild</button>
                    </div>
                </div>
            </div>
        </div>
        <FXModal OverScrollY={true} showCloseBtn={true} isOpen={openModal}
            close={() => {
                setFileList({ CurrIndex: 0, Files: [] })
                setOpenModal(false)
            }}
        >
            <div className={"panel"}><button value={"Add Upload Cell"} onClick={() => {

                let ls = [...fileList.Files]
                let NextIndex = fileList.CurrIndex + 1;
                ls.push({ Index: NextIndex, IsUpload: false })
                setFileList({ CurrIndex: NextIndex, Files: [...ls] })
            }} >Add Upload Cell</button></div>
            <div> <input type="button" value="Start Upload"
                onClick={() => {
                    StartUpload(-1);
                }}
            />
            </div>
            <hr />
            <div>
                {fileList?.Files?.map(c => {
                    return <div key={`${state.Album.Name}_${c.Index}`}>
                        <UploadCell Album={state.Album} Index={c.Index} StartUpload={c.IsUpload}
                            Delete={(index) => {
                                let filterList = fileList.Files.filter((f) => f.Index !== index)
                                setFileList({ CurrIndex: fileList.CurrIndex, Files: [...filterList] });
                            }}
                            UpLoadEndCallBack={(index) => {
                                StartUpload(index)
                            }} />
                        <hr />
                    </div>
                })}
            </div>
        </FXModal >
    </div >
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