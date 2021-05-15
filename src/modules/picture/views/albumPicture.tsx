import React, { useContext, useState } from "react"
import { Picture } from "../../../model/album";
import MasterPage from "../../../framework/Master/@masterPage"
import Master from "../../../framework/Master/master"
import { AlbumPictureContext, AlbumPictureReducer, AlbumPictureState } from "../store/AlbumPictureState.store"
import { FXImage, ImageType } from "../../../framework/components/fxImage";
import { FXModal } from "../../../framework/components/modal/fxModal";
import { splitDesc } from "../utils/strUtils";

// if (process.env.BROWSER) {
    require('../../../../static/css/albumPictureList.css')
// }


function Pic(props: { pic: Picture }) {
    return <a href="#" className="thumbnail">
        <FXImage style={{ width: "200px", height: "200px", objectFit: "contain" }}
            name={props.pic.MiniPath}
            type={ImageType.MixAlbum}
            desc={props.pic.Album} />
    </a>
}

function List() {
    const { state, dispatcher } = React.useContext(AlbumPictureContext);
    let openImage: Picture
    const [openImg, setOpenImg] = useState(openImage);


    return <>
        <div className="row">
            <ul>
                {state.Album.PicList.map(pic => {
                    return <li key={pic.MiniPath}
                        className="image-list-wrap"
                        onClick={() => {
                            openImg;
                            setOpenImg(pic)
                        }}
                    >
                        <Pic pic={pic} />
                    </li>
                })}
            </ul>
        </div>
        {openImg &&
            <FXModal
                isOpen={true}
                close={() => {
                    setOpenImg(null);
                }}
                showCloseBtn={true}
                backDropClose={true}
                attr={{ style: { width: "100%", height: "100%", top: 0, left: 0, backgroundColor: "transparent" } }}
            >
                <FXImage style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    name={openImg.MaxPath}
                    type={ImageType.MixAlbum}
                    desc={openImg.Album} />
            </FXModal>
        }
    </>
}

function Top() {
    const { state, dispatcher } = useContext(AlbumPictureContext)
    const [showMore, setShowMore] = useState(false)
    const isfix = state.Album.Description.length > 50;


    return <div className="page-header">
        <h3>{state.Album.Name}
            <br />&nbsp;&nbsp;
            {!showMore && isfix &&
                <>
                    <small style={{ wordWrap: "break-word" }}
                        dangerouslySetInnerHTML={{ __html: `${splitDesc(state.Album.Description)}${isfix ? "..." : ""}` }}></small>
                    {isfix &&
                        <small style={{ wordWrap: "break-word" }}>
                            <a href="#" onClick={() => { setShowMore(true) }} style={{ wordWrap: "break-word" }}> more</a>
                        </small>
                    }
                </>
            }
            {(showMore || !isfix) &&
                <>
                    <small style={{ wordWrap: "break-word" }}
                        dangerouslySetInnerHTML={{ __html: splitDesc(state.Album.Description,true) }}></small>
                    {isfix &&
                        <small style={{ wordWrap: "break-word" }}>
                            <a href="#" onClick={() => { setShowMore(false) }} style={{ wordWrap: "break-word" }}> less</a>
                        </small>
                    }
                </>
            }

        </h3>
    </div >
}

function Content(initalState: AlbumPictureState) {

    const [state, dispatcher] = React.useReducer(AlbumPictureReducer, initalState)

    return <AlbumPictureContext.Provider value={{ state, dispatcher }}>
        <Top />
        <List />
    </AlbumPictureContext.Provider>
}


@MasterPage(Master)
export class AlbumPicturePage extends React.Component<AlbumPictureState, any>{
    constructor(props) {
        super(props)
    }
    render() {
        return <div className="container">
            <Content {...this.props} />
        </div>
    }
}