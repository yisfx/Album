import React from "react"
import MasterPage from "../../../framework/master/@masterPage"
import Master from "../../../framework/master/master"



function Bottom() {
    return <div>

    </div>
}

@MasterPage(Master)
export class Album extends React.Component<any>{
    constructor(props) {
        super(props)
    }

    render() {
        const height = window?.screen.availHeight * .75

        return (
            <div className="container">
                <div className="row" style={{ height, backgroundColor: "#000000" }}>
                </div>
            </div>

        )
    }
}