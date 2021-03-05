import React, { useEffect, useState } from "react"
import MasterPage from "../../../framework/master/@masterPage"
import Master from "../../../framework/master/master"
import Swiper, { ReactIdSwiperProps } from "react-id-swiper";

if (process.env.BROWSER) {
    require('../../../../static/css/main.css')
    require('swiper/dist/css/swiper.mini.css')
}


function Cover() {

    const mmm = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0,]
    const params = {
        direction: 'horizontal',
        slidesPerView : 1, //显示数量
        grabCursor: true,
        setWrapperSize: true,//开启这个设定会在Wrapper上添加等于slides相加的宽高，在对flexbox布局的支持不是很好的浏览器中可能需要用到
        roundLengths: true,//设定为true将slide的宽和高取整(四舍五入)以防止某些屏幕上文字模糊
        loop: false,
        observer: true,
        observeSlideChildren: true,
        on: {
            paginationRender: () => {
                console.log("paginationRender")
            },
        },
    }
    return <>
        <Swiper {...params}>
            {mmm.map((v, i) => i % 2 == 0 ?
                <div key={i} className="side-container">{i}</div>
                :
                <div key={i} className="side-container">{i}</div>

            )}
        </Swiper>
    </>
}

function Content() {
    return (
        <div className="bgground">
            <div className="main-menum">
                <button className="btn">---___</button>
            </div>
            <div style={{ padding: "5px", height: "100%" }}>
                <div className="Cover">
                    <Cover />
                </div>
            </div>

        </div>
    )
}



@MasterPage(Master)
export class Album extends React.Component<any>{
    constructor(props) {
        super(props)
    }

    render() {
        return <div>
            <Content />
        </div>
    }
}