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

if (process.env.BROWSER) {
    require('../../../../static/css/main.css')
    require('swiper/dist/css/swiper.css')
}


function Cover(props: { AlbumList: { [key: string]: Album[] } }) {
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
                console.log("paginationRender")
            },
        },
    }
    const firstAlbumList = (): Album[] => {
        let list = Object.keys(props?.AlbumList).map(key => parseInt(key))
        let key = list.sort((a, b) => a - b)[0]
        return props?.AlbumList[key]
    }
    const albumList = firstAlbumList();

    return <>
        <Swiper {...params}>
            {albumList?.map((v, i) =>
                <div key={i + "_swiap"} >
                    <div className="main-sider">
                        <div className="image-container">
                            <div>
                                <FXImage
                                    className={pc ? "main-img-pc" : "main-img-mobile"}
                                    name={v.Cover}
                                    type={ImageType.MixAlbum}
                                    desc={v.Description} />
                                <div className={pc ? "main-desc-pc" : "main-desc-mobile"}
                                    onClick={() => {
                                        window.location.href = urlBuilder(PageNameList.AlbumPictureList, v.CNName);
                                    }}
                                >
                                    {v.Name}
                                    <br />
                                    {v.Date}
                                    <br />
                                    {v.Description}
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
                    window.location.href = urlBuilder(PageNameList.AlbumPictureList, album.CNName);
                }} key={album.Name + "_menu_album"}>{album.Name}
                </li>)}
        </ul>
    </div>
}

function MenumList(props: { initalState: AlbumState }) {
    const [selectYear, setSelectYear] = useState("");
    const yearList = Object.keys(props.initalState?.AlbumList).map(key => key)

    return <ul className="main-menu-list-ul">
        {yearList.map(year =>
            <li key={year + "_menu_year"}>
                <div onClick={() => {
                    setSelectYear(year == selectYear ? "" : year);
                }}>
                    <i className={`glyphicon glyphicon-menu-${selectYear == year ? "down" : "right"}`}></i>
                &nbsp;&nbsp;{year}
                </div>
                {selectYear == year && <RenderAlbumMenuList albumList={props.initalState?.AlbumList[year]} />}
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