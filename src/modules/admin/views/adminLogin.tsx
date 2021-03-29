import React, { useContext, useReducer, useState } from "react";
import Master from "../../../framework/Master/master";
import MasterPage from "../../../framework/Master/@masterPage";
import { Ajax } from "src/framework/httpclient/ajax";

if (process.env.BROWSER) {
    require('../../../../static/css/login.css')
}


function Pwd(props: { K: string, setValue: (key: string, value: string) => void }) {
    const [showPwd, setShowPwd] = useState(false);
    const [pwd, setPwd] = useState("");

    return <div className="input-group">
        <div className="input-group-btn">
            <button className="btn btn-default" type="button">{props.K}</button>
        </div>
        <input type={showPwd ? "text" : "password"} className="form-control" value={pwd}
            onChange={(evt) => {
                setPwd(evt.target.value);
                props.setValue(props.K, pwd);
            }} />
        <div className="input-group-btn">
            <button className="btn btn-default" type="button"
                onClick={() => {
                    setShowPwd(!showPwd);
                }}
            >{showPwd ? "hide" : "Show"}</button>
        </div>
    </div>
}

function Content(props: any) {
    const initPwdList = { A: "", B: "", C: "", D: "" }
    const pwdKeyList = ["A", "B", "C", "D"]
    const [pwd, setPwd] = useState(initPwdList);

    const submit = () => {
        Ajax("loginapi", pwd).then(resp => {
            if (resp.Result) {
                ///set cookie
                ///
            }
        })
    }

    return <div className="container">
        < div className="row" >
            <div className="col-xs-12">
                <div style={{ height: "30px" }}></div>
                {pwdKeyList.map(key => <Pwd key={key} K={key}
                    setValue={(key, value) => {
                        let v = pwd;
                        v[key] = value
                        setPwd({ ...v });
                    }} />)}
                <button type="button" className="btn btn-primary">（首选项）Primary</button>
            </div>
        </div >
    </div >
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