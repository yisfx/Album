import React, { FC, useEffect, useState } from "react";
import Modal from "react-modal";

interface Props {
    size?: { width: string, height: string, marginLeft: string, marginTop: string }
    isOpen: boolean
    close?(): void
}


export const FxModal: FC<Props> = (props) => {

    const [open, setOpen] = useState(false);


    const style = { width: "50%", height: "60%", marginLeft: "25%", marginTop: "10%", ...props.size || {} }

    useEffect(() => {
        setOpen(props.isOpen)
    }, [props.isOpen])


    return (
        <Modal
            appElement={document.body}
            isOpen={open}
            style={{ overlay: { ...style } }}
        >
            <div className="row">
                <div className="col-sm-11">
                </div>
                <div className="col-sm-1">
                    <div onClick={props?.close}><i className="glyphicon glyphicon-remove" /></div>
                </div>
            </div>
            <div className="">
                {props.children}
            </div>
        </Modal>
    )
}

