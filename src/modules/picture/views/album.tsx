import React from "react"
import MasterPage from "../../../framework/master/@masterPage"
import Master from "../../../framework/master/master"
import Swiper from "react-id-swiper";
import { AlbumState } from "../store/album.state";
import { Album } from "../../../model/album";
import { FXImage, ImageType } from "../../../framework/components/fxImage";
import { urlBuilder } from "../../../framework/urlBuilder";
import { PageNameList } from "../../../framework/route.config";

if (process.env.BROWSER) {
    require('../../../../static/css/main.css')
    require('swiper/dist/css/swiper.css')
}


function Cover(props: { AlbumList: Album[] }) {
    const pc = window.screen.height < window.screen.width

    const mmm = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0,]
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

    const albumList = props?.AlbumList;
    return <>
        <Swiper {...params}>
            {albumList?.map((v, i) =>
                <div key={i} >
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

function Content(initalState: AlbumState) {
    return (
        <div className="bgground">
            <div className="main-menum">
                <button className="btn">---___</button>
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