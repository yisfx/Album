import React, { FC, useEffect, useState } from "react";
import ReactDOM from "react-dom";

if (process.env.BROWSER) {
    require('./modal.css')
}

interface Props {
    size?: { width: string, height: string, marginLeft: string, marginTop: string }
    isOpen: boolean
    close?(): void
}

export const DemoModal: FC<Props> = (props) => {
    const ddd: HTMLDivElement = null;
    const [popup, setPopup] = useState(ddd)


    const render = () => {
        let popup = document.createElement("div");
        popup.className = "shadow";
        setPopup(popup);
        document.body.appendChild(popup);
        ReactDOM.render(<>
            <div className="modal" onClick={() => {
                props.close && props.close();
            }}>
                {props.children}
            </div>
        </>, popup)
    }

    useEffect(() => {
        if (props.isOpen) {
            render();
        } else {
            document.removeChild(popup);
            setPopup(null);
        }
    }, [props.isOpen])

    return <>

    </>
}