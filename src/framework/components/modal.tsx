import React, { FC, useEffect, useState } from "react";
// import Modal from "react-modal";

interface Props {
    isOpen: boolean
    close?(): void
}


export const FxModal: FC<Props> = (props) => {

    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(props.isOpen)
    }, [props.isOpen])


    return (
        <React.Fragment>
            {props.children}
            {/* <Modal isOpen={open}></Modal> */}
        </React.Fragment>
    )
}