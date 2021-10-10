import React, { useState } from "react"
import MasterPage from "../../../framework/master/@masterPage"
import Master from "../../../framework/master/master"
import Swiper from "react-id-swiper";
import { AlbumState } from "../store/album.state";
import { Album } from "../../../model/album";
import { FXImage, ImageType } from "../../../framework/components/fxImage";
import { urlBuilder } from "../../../framework/urlBuilder";
import { PageNameList } from "../../../framework/route.config";
import { isMobile } from "../../../framework/utils";
import { splitDesc } from "../utils/strUtils";
import { Ajax } from "../../../framework/httpclient/ajax";
import { AlbumListResponse } from "../../../model/response/albumListResponse";

// if (process.env.BROWSER) {
require('../../../../static/css/main.css')
require('swiper/dist/css/swiper.css')
// }


function Cover(props: { AlbumList: Album[] }) {
    const pc = window.screen.height < window.screen.width
    const params = {
        direction: 'horizontal',
        // grabCursor: true,
        setWrapperSize: true,//开启这个设定会在Wrapper上添加等于slides相加的宽高，在对flexbox布局的支持不是很好的浏览器中可能需要用到
        roundLengths: true,//设定为true将slide的宽和高取整(四舍五入)以防止某些屏幕上文字模糊
        // loop: false,
        // observer: true,
        // observeSlideChildren: true,
        pagination: {
            el: '.swiper-pagination'
        },
        on: {
            paginationRender: () => {
            },
        },
    }

    return <>
        <Swiper {...params}>
            {props?.AlbumList?.map((v, i) =>
                <div key={i + "_swiap"} >
                    <div className="main-sider">
                        <div className="image-container">
                            <div>
                                <FXImage
                                    className={pc ? "main-img-pc" : "main-img-mobile"}
                                    name={v.Cover}
                                    LoadEnd={() => { }}
                                    type={ImageType.MixAlbum}
                                    desc={v.Description} />
                                <div className={pc ? "main-desc-pc" : "main-desc-mobile"}
                                    onClick={() => {
                                        window.location.href = urlBuilder(PageNameList.AlbumPictureList, v.Name);
                                    }}
                                >
                                    <div>{v.CNName}</div>
                                    <div>{v.Date}</div>
                                    <div dangerouslySetInnerHTML={{ __html: `${splitDesc(v.Description)}...` }} >{ }</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Swiper>
    </>
}

function RenderAlbumMenuList(props: { albumList: Album[] }) {
    return <div>
        <ul className={isMobile ? "child-menu-list-ul-mobile" : "child-menu-list-ul"}>
            {props.albumList.map(album =>
                <li onClick={() => {
                    window.location.href = urlBuilder(PageNameList.AlbumPictureList, album.Name);
                }} key={album.Name + "_menu_album"}>{album.CNName}
                </li>)}
        </ul>
    </div>
}

function MenumList(props: { initalState: AlbumState }) {
    const [selectYear, setSelectYear] = useState({ currYear: 0, AlbumList: [] });
    const yearList = props.initalState?.YearList

    return <ul className="main-menu-list-ul">
        {yearList.map(year =>
            <li key={year + "_menu_year"}>
                <div onClick={() => {
                    ///sen request
                    let y = year == selectYear.currYear ? 0 : year
                    if (props.initalState.CurrentYear == year) {
                        setSelectYear({ currYear: y, AlbumList: props.initalState.AlbumList });
                    } else {
                        Ajax("getEntryAlbumListByYearApi", { Year: year }).then((resp: AlbumListResponse) => {
                            if (resp.Result) {
                                let y = year == selectYear.currYear ? 0 : year
                                setSelectYear({ currYear: y, AlbumList: resp.AlbumList });
                            }
                        })
                    }
                }}>
                    <i className={`glyphicon glyphicon-menu-${selectYear.currYear == year ? "down" : "right"}`}></i>
                    &nbsp;&nbsp;{year}
                </div>
                {selectYear.currYear == year && <RenderAlbumMenuList albumList={selectYear.AlbumList} />}
            </li>)}
    </ul>
}


function Content(initalState: AlbumState) {

    const [openMenu, setShowMenu] = useState(false)
    return (
        <div className="bgground">
            <div className={isMobile ? "main-menum-mobile" : "main-menum"}>
                <div className={`${isMobile ? "menu-icon-mobile" : "menu-icon"} glyphicon ${openMenu ? "glyphicon-menu-up" : "glyphicon-menu-down"}`}

                    onClick={() => {
                        setShowMenu(!openMenu);
                    }}>
                </div>
                {openMenu &&
                    <div className={isMobile ? "main-menu-list-mobile" : "main-menu-list"}>
                        <MenumList initalState={initalState} />
                    </div>
                }
            </div>
            <div className="Cover">
                <Cover AlbumList={initalState.AlbumList} />
            </div>
        </div>
    )
}

@MasterPage(Master)
export class AlbumPage extends React.Component<AlbumState, any>{
    constructor(props) {
        super(props)
    }
    render() {
        return <div>
            <Content {...this.props} />
        </div>
    }
}