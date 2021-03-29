import React, { FC, useEffect, useState } from "react";
import ReactDOM from "react-dom";

if (process.env.BROWSER) {
    require('./modal.css')
}

interface Props {
    size?: { width: string, height: string, marginLeft: string, marginTop: string }
    isOpen: boolean
    close?(): void
    attr?: React.HTMLAttributes<HTMLDivElement>
    showCloseBtn: boolean
}

export const FXModal: FC<Props> = (props) => {
    const ddd: HTMLDivElement = null;
    const [popup, setPopup] = useState(ddd)

    const close = (p) => {
        p && document.body.removeChild(p);
        setPopup(null);
        props.close && props.close();
    }


    const render = () => {
        let popup = document.createElement("div");
        popup.className = "";
        setPopup(popup);
        document.body.appendChild(popup);

        ReactDOM.render(<>
            <div className="modal-container" onClick={() => {
                close(popup)
            }}></div>
            <div className="fx-modal-content" onClick={(evt) => {
                evt.preventDefault();
            }}
                {...props.attr}
            >
                {props.showCloseBtn &&
                    <i className="modal-close-btn glyphicon glyphicon-remove" onClick={() => { close(popup) }}></i>
                }

                {props.children}
            </div>
        </>, popup)
    }

    useEffect(() => {
        if (props.isOpen) {
            render();
        } else {
            close(popup)
        }
    }, [props.isOpen])

    return null;
}