import React, { useEffect, useState } from "react"
import MasterPage from "../../../framework/master/@masterPage"
import Master from "../../../framework/master/master"
declare let Swiper

function Bottom() {
    return <div className="">
        <div className="swiper-container">
            <div className="swiper-wrapper">
                <div className="swiper-slide">slider1</div>
                <div className="swiper-slide">slider2</div>
                <div className="swiper-slide">slider3</div>
            </div>
        </div>
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