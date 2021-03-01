import React from "react"
import MasterPage from "../../../framework/master/@masterPage"
import Master from "../../../framework/master/master"



function Bottom() {
    
    return <div className="">

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
                <script src="https://3.swiper.com.cn/dist/js/swiper.min.js"></script>
            </div>

        )
    }
}