import React, { useEffect, useState } from "react";
import Modal from "react-modal";




export function FxModal(props: { isOpen: boolean }) {

    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(props.isOpen)
    }, [props.isOpen])


    return (
        <React.Fragment>
            <Modal isOpen={open}></Modal>
        </React.Fragment>
    )
}