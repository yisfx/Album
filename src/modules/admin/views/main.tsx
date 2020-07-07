import React from "react";
import { urlBuilder } from "src/framework/urlBuilder";
import { PageNameList } from "src/framework/route.config";


export class Main extends React.Component<any>{
    constructor(props) {
        super(props)
        window.onload=()=>{
            window.location.href=urlBuilder(PageNameList.AdminAlbum)
        }
    }

    render() {

        return (
            <div>
               
            </div>
        )
    }
}