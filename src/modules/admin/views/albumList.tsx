

import React, { useContext, useReducer, useState } from "react";
import { AlbumContext, AlbumReducer, AlbumState, dispatchMiddleWare } from "../store/album.store";
import AdminMaster from "../../../framework/master/adminMaster";
import MasterPage from "../../../framework/master/@masterPage";
import { FXModal } from "../../../framework/components/modal/fxModal";
import { BaseResponse } from "../../../model/response/baseResponse";
import { Ajax } from "../../../framework/httpclient/ajax";
import { FXImage, ImageType } from "../../../framework/components/FXImage";
import { Album } from "../../../model/album";
import { urlBuilder } from "../../../framework/urlBuilder";
import { PageNameList } from "../../../framework/route.config";
import { AddAlbumRequest } from "../../../model/request/addAlbumRequest";
import { splitDesc } from "../../../modules/picture/utils/strUtils";

function EditAlbumPopu(props: { album: Album }) {

    const [album, setAlbum] = useState(props.album || ({} as Album))
    const [errorMessage, setErrorMsg] = useState("")
    const submit = () => {
        if (!album.Name || !album.Date || !album.Description || !album.CNName)
            return;
        let request = { Album: album };
        Ajax<AddAlbumRequest>("AddAlbumApi", request).then((resp: BaseResponse) => {
            if (resp.Result) {
                window.location.reload();
            } else {
                setErrorMsg(resp.ErrorMessage);
            }
        });
    }

    return <form>
        <div style={{ margin: "10px" }}>
            <div className="form-group">
                <label>CN Name</label>
                <input type="text"
                    className="form-control"
                    placeholder="CN Name"
                    value={album.CNName}
                    onChange={(evt) => { setAlbum({ ...album, CNName: evt.target?.value || "" }) }} />
            </div>
            <div className="form-group">
                <label>Name</label>
                <input type="text"
                    className="form-control"
                    placeholder="Name"
                    readOnly={!!props.album}
                    value={album.Name}
                    onChange={(evt) => { setAlbum({ ...album, Name: evt.target?.value || "" }) }} />
            </div>
            <div className="form-group">
                <label>DateTime</label>
                <input
                    type="date"
                    className="form-control"
                    placeholder="DateTime"
                    readOnly={!!props.album}
                    value={album.Date}
                    onChange={(evt) => {
                        setAlbum({ ...album, Date: evt.target?.value || "" })
                    }} />
            </div>
            <div className="form-group">
                <label>Description</label>
                <textarea className="form-control"
                    placeholder="Description"
                    value={album.Description}
                    onChange={(evt) => {
                        setAlbum({ ...album, Description: evt.target?.value || "" })
                    }}></textarea>
            </div>
            <div className="row">
                <div className="col-lg-10">
                </div>
                <div className="col-lg-2">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={submit}
                    >Submit</button>
                </div>
            </div>
            {errorMessage &&
                <div className="alert alert-danger" role="alert">{errorMessage}</div>
            }
        </div>
    </form>
}

function Top() {
    const { state, dispatcher } = useContext(AlbumContext)
    const [isOpen, setIsOpen] = useState(false);

    const [name, setName] = useState("");
    const [dateTime, setDateTime] = useState("")
    const [description, setDescription] = useState("")

    const clearData = () => {
        setName("")
        setDateTime("")
        setDescription("")
        setErrorMsg("")
    }

    const [errorMessage, setErrorMsg] = useState("")

    return <div className="row">
        <div style={{ marginTop: "100px" }}></div>
        <div className="col-md-4">
            <div className="page-header">
                <h3>Current Album Count({state.AlbumList?.length})</h3>
            </div>
        </div>
        <div className="col-md-2">
            <button
                type="button"
                className="btn btn-info"
                onClick={() => {
                    clearData()
                    setIsOpen(true)
                }}
            >Create Album</button>
        </div>
        <div className="col-md-2">
            <button
                type="button"
                className="btn btn-info"
                onClick={() => {
                    Ajax("buildAllAlbumApi", {}).then((resp: BaseResponse) => {
                        if (resp.Result) {
                            window.location.reload();
                        } else {
                            setErrorMsg(resp.ErrorMessage);
                        }
                    });
                }}
            >Buid All Album</button>
        </div>
        <div className="col-md-2">
            <button
                type="button"
                className="btn btn-info"
                onClick={() => {
                    Ajax("buildAlbumPictureApi", {}).then((resp: BaseResponse) => {
                        if (resp.Result) {
                            window.location.reload();
                        } else {
                            setErrorMsg(resp.ErrorMessage);
                        }
                    });
                }}
            >Buid All Album Picture</button>
        </div>
        {isOpen &&
            <FXModal
                showCloseBtn={true}
                isOpen={isOpen}
                close={() => {
                    setIsOpen(false)
                }}
            >
                <EditAlbumPopu album={undefined} />
            </FXModal>
        }
    </div>
}

function AlbumContent(prop: { album: Album }) {
    const [isOpen, setOpen] = useState(false)
    return <>
        <div className="row list-group-item" style={{ height: "120px", }}>
            <div className="col-lg-2">
                <FXImage style={{ width: "100px", height: "100px", objectFit: "contain" }}
                    name={`${prop.album.Name}-${prop.album.Cover}-mini.jpg`}
                    type={ImageType.Album}
                    desc={undefined} />
            </div>
            <div className="col-lg-8" onClick={() => {
                window.location.href = urlBuilder(PageNameList.AdminAlbumPicList, prop.album.Name);
            }}>
                <div>Name:{prop.album.Name}</div>
                <div>CNName:{prop.album.CNName}</div>
                <div>Date:{prop.album.Date}</div>
                <div>{`Description:${splitDesc(prop.album.Description)}`}</div>
            </div>
            <div className="col-lg-2"></div>
            <button type="button" className="btn btn-info"
                onClick={(evt) => {
                    setOpen(true)
                }}
            >Edit</button>
        </div>
        {isOpen &&
            <FXModal
                showCloseBtn={true}
                isOpen={isOpen}
                close={() => {
                    setOpen(false)
                }}
            >
                <EditAlbumPopu album={prop.album} />
            </FXModal>
        }
    </>
}

function List() {
    const { state, dispatcher } = useContext(AlbumContext)
    return <>
        <div className="list-group">
            {state.AlbumList?.map((a, index) => <AlbumContent key={`${a.Name}_${index}`} album={a}></AlbumContent>)}
        </div>
    </>
}


function Content(initalState: AlbumState) {

    const [state, dispatch] = useReducer(AlbumReducer, initalState);

    return <>
        <AlbumContext.Provider value={{ state, dispatcher: dispatchMiddleWare(dispatch) }}>
            <Top />
            <List />
        </AlbumContext.Provider>
    </>
}



@MasterPage(AdminMaster)
export default class AlbumListPage extends React.Component<AlbumState, any> {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Content {...this.props} />

        )
    }
}