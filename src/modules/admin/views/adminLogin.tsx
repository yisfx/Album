import React, { useContext, useReducer, useState } from "react";
import Master from "../../../framework/Master/master";
import MasterPage from "../../../framework/Master/@masterPage";

if (process.env.BROWSER) {
    require('../../../../static/css/login.css')
}

function Content(props: any) {
    const [showPwd, setShowPwd] = useState(false);
    const [pwd, setPwd] = useState("");

    return <div className="container">

        <div className="row">
            <div className="col-xs-12">
                <div style={{ height: "30px" }}></div>
                <div className="input-group">
                    <input type={showPwd ? "text" : "password"} className="form-control" value={pwd}
                        onChange={(evt) => {
                            setPwd(evt.target.value);
                        }} />
                    <div className="input-group-btn">
                        <button className="btn btn-default" type="button">{showPwd ? "hide" : "Show"}</button>
                        <button className="btn btn-default" type="button">Input</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

@MasterPage(Master)
export default class AdminLogin extends React.Component<any, any>{
    constructor(props) {
        super(props)
    }

    render() {
        return <div>
            <Content {...this.props} />
        </div>
    }
}