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
    const [isOpen, setOpen] = useState(false)

    const render = () => {
        let popup = document.createElement("div");
        popup.className = "modal-container";

        setPopup(popup);
        popup.onclick = () => {
            document.body.removeChild(popup);
            setPopup(null);
        }
        document.body.appendChild(popup);

        ReactDOM.render(<>
            <div className="modal-content" onClick={() => {
                props.close && props.close();
            }}>
                {props.children}
            </div>
        </>, popup)
    }

    useEffect(() => {
        if (props.isOpen) {
            setOpen(true);
            render();
        } else {
            setOpen(false);
            document.body.removeChild(popup);
            setPopup(null);
        }
    }, [props.isOpen, isOpen])

    return null;
}