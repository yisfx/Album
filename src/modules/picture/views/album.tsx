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
                    <img src="https://akamai.newegg.com.sh/WebResource/Themes/Nest/qrcodes/scan-step-3.png"
                        style={{ height: "90vh", objectFit: "cover", margin: "0 auto" }} />
                }
                {
                    v % 2 != 0 &&
                    <img src="https://c1.neweggimages.com/WebResource/Themes/2005/Nest/logo_424x210.png"
                        style={{ height: "90vh", objectFit: "cover", margin: "0 auto" }} />
                }

            </div>
        )}
    </Swiper>
}

function Content() {
    return (
        <div>
            <div style={{ height: "100vh", backgroundColor: "" }}>
                <div style={{ height: "2vh" }}></div>
                <Cover height={"98vh"} />
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
        return <Content />
    }
}
