import React, { useState } from "react";


export default class Master extends React.Component<any, any> {
    constructor(props) {
        super(props)
    }
    render() {

        const [showICP, setShowICP] = useState(false)


        return (
            <div>
                <div className="">
                    {this.props.children}
                </div>
                <div style={{ position: "absolute", bottom: "10px", right: "10px" }}>
                    <a href="http://beian.miit.gov.cn/">互联网ICP备案：豫ICP备20015772号</a>
                    <i className=""></i>
                </div>
            </div>
        )
    }


}