import React, { useEffect, useState } from "react"
import MasterPage from "../../../framework/master/@masterPage"
import Master from "../../../framework/master/master"
import Swiper, { ReactIdSwiperProps } from "react-id-swiper";

if (!!window) {
    require('swiper/dist/css/swiper.min.css')
}


function Cover(props: { height: string }) {

    const mmm = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0,]
    const params = {
        direction: 'horizontal',
        slidesPerView: 1, //显示数量
        grabCursor: true,
        setWrapperSize: true,
        roundLengths: true,

        loop: true,
        observer: true,
        observeSlideChildren: true,
        speed: 1000,
        on: {

        }
    }
    return <Swiper {...params}>
        {mmm.map((v, i) =>
            <div key={i + "_" + v} className="swiper-slide" style={{ display: "inline", textAlign: "center" }}>
                {v % 2 == 0 &&
                    <img src="http://localhost:9000/kjsdfh/album/aaa-IMG_20210217_193742-mini.jpg"
                        style={{ height: "98vh", objectFit: "cover", margin: "0 auto" }} />
                }
                {
                    v % 2 != 0 &&
                    <img src="http://localhost:9000/kjsdfh/album/aaa-IMG_20210217_193800-mini.jpg"
                        style={{ height: "98vh", objectFit: "cover", margin: "0 auto" }} />
                }

            </div>
        )}
    </Swiper>
}

function Content() {
    return (
        <div className="jumbotron" style={{ height: "100vh", marginBottom: "0", paddingTop: "1vh" }}>
            <div style={{ position: "absolute", top: "0px", right: "10px" }}>
                <button className="btn">---___</button>
            </div>
            <Cover height={"99vh"} />
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


const stylesheet = {

}