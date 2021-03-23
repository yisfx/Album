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

export class DemoModal1 extends React.Component<Props>{

    constructor(props) {
        super(props)
    }

    componentWillUnmount() {

    }

    render() {
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
                    this.props.close && this.props.close();
                }}>
                    {this.props.children}
                </div>
            </>, popup)
        }

        useEffect(() => {
            if (this.props.isOpen) {
                setOpen(true);
                render();
            } else {
                setOpen(false);
                document.body.removeChild(popup);
                setPopup(null);
            }
        }, [this.props.isOpen, isOpen])

        return null;
    }
}

export const DemoModal: FC<Props> = (props) => {
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
            <div className="modal-content" onClick={(evt) => {
                evt.preventDefault();
            }}>
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