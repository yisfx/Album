import React, { useEffect, useState } from "react"
import MasterPage from "../../../framework/master/@masterPage"
import Master from "../../../framework/master/master"
import Swiper from "react-id-swiper";

if (!!window) {
    require('swiper/dist/css/swiper.min.css')
}


function Bottom() {

    const mmm = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0,]
    const params = {
        direction: 'horizontal',
        slidesPerView: 6, //显示数量
        grabCursor : true,
        setWrapperSize :true,
        roundLengths : true, 
        loop: false,
        observer: true,
        observeSlideChildren: true,
        speed: 1000,
    }
    return <div className="">
        <Swiper {...params}>
            {mmm.map((v, i) => <div key={i} className="swiper-slide" style={{ display: "inline" }}>
                <img src="http://localhost:9000/kjsdfh/album/aaa-IMG_20210217_193742-mini.jpg"
                    style={{ width: "100px", margin: "20px" }} />
            </div>)}
        </Swiper>
    </div>
}

@MasterPage(Master)
export class Album extends React.Component<any>{
    constructor(props) {
        super(props)
    }

    render() {
        const mheight = window.screen.height > window.screen.width ? 80 : 75
        const height = mheight + "vh"
        const bottomHeight = (100 - mheight) + "vh"

        return (
            <div>
                <div style={{ height, backgroundColor: "#000000" }}>
                </div>
                <div style={{ height: bottomHeight, backgroundColor: "#00CED1" }}>
                    <Bottom />
                </div>
            </div>
        )
    }
}