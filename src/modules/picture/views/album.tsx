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
require('../../../../static/css/leftMenu.css')
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



function LeftMenu(props: { initalState: AlbumState }) {

    enum MenuStep {
        Show = "Show",
        Hidden = "Hidden",
        Load = "load"
    }

    const [selectYear, setSelectYear] = useState({ currYear: 0 });
    const yearList = props.initalState?.YearList

    const [menuStep, setMenuStep] = useState(MenuStep.Load)
    const [iconStep, setIconStep] = useState(MenuStep.Show)

    const show = () => {
        setIconStep(MenuStep.Hidden)
        setMenuStep(MenuStep.Show)
    }
    const close = () => {
        setIconStep(MenuStep.Show)
        setMenuStep(MenuStep.Hidden)
        setSelectYear({ currYear: 0 })
    }

    return <>
        <div className={`${iconStep == MenuStep.Show ? "show-menu-icon" : "hiden-menu-icon"} left-menu-icon glyphicon glyphicon-menu-hamburger`}
            aria-hidden="true"
            onClick={() => show()}
        ></div>
        {menuStep == MenuStep.Show &&
            <div className="left-menu-container-shadow" onClick={() => { close() }}></div>
        }

        <div className={`${menuStep == MenuStep.Load ? "" : (menuStep == MenuStep.Hidden ? "hiden-menu-container" : "show-menu-container")} left-menu-container`}>

            <div className="left-menu-container-icon">
                <div className="glyphicon glyphicon-menu-left" onClick={() => { close() }}></div>
            </div>
            <div className="menu-year-list">

                <div className={"menu-year"}>
                    {props.initalState.YearList.map((year, index) => {

                        return <React.Fragment key={`yea-list-${year.Year}`}>

                            <div className={"year"}
                                onClick={() => {
                                    let y = year.Year == selectYear.currYear ? 0 : year.Year

                                    setSelectYear({ currYear: y });
                                }}>
                                {year.Year}
                            </div>
                            <>
                                <div className={`${selectYear.currYear == year.Year ? "show-album-list" : "hiden-album-list"} album-list`}>
                                    {year.AlbumList.map(album =>
                                        <div key={`left-album-${album.CNName}`}
                                            className={`${selectYear.currYear == year.Year ? "show-album-list" : "hiden-album-list"} album`}
                                            onClick={() => {
                                                window.location.href = urlBuilder(PageNameList.AlbumPictureList, album.Name);
                                            }}>{album.CNName}</div>
                                    )}

                                </div>
                            </>

                            {index != props.initalState.YearList.length - 1 &&
                                <div className={"line"}></div>
                            }
                        </React.Fragment>
                    })}

                </div>
            </div>
        </div>

    </>
}




function Content(initalState: AlbumState) {

    const [openMenu, setShowMenu] = useState(false)
    return (
        <div className="bgground">
            <LeftMenu initalState={initalState} />
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
