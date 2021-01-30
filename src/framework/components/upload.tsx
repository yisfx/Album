import React from "react";
import ReactDom, { render } from "react-dom";
// const ReactRender = require('fast-react-render');
import ReactRender from "fast-react-render";

class IProps {
    UploadUrl: string;
    Upload: () => void
}
export function Upload(props: React.PropsWithChildren<IProps>) {




    return < div >
        {props.children}
        {/* <iframe srcDoc={ReactRender.elementToString(React.createElement(str, props), { context: {} })}>

        </iframe> */}
    </div >
}


function str(props: React.PropsWithChildren<IProps>) {
    return <html>
        <body>
            <form action={props.UploadUrl}>

            </form>
        </body>
    </html>
}