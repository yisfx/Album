import { render } from "react-dom";
import React from "react";
import AdminLogin from "../views/adminLogin";



export class LoginPage extends React.Component<any>{
    render() {
        return <AdminLogin {...(this.props as any)} />;
    }
}
let readtData = window["__reactData__"]
render(
    <LoginPage {...readtData} />,
    document.getElementById("app")
)


