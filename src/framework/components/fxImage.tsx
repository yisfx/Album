import React, { useEffect, useState } from "react"
import { BuildAlbumImageUrl, buildImageUrl } from "../imageBuild";



enum ImageType {
    Normal,
    Album
}

interface IProps extends React.ComponentProps<"img"> {
    name: string,
    type: ImageType,
    desc: string
}

function FXImage(props: IProps) {

    let image = "";
    const [error, setError] = useState(false);
    if (error) {
        image = buildImageUrl("image/error.jpg");
    } else {
        switch (props.type) {
            case ImageType.Album: image = BuildAlbumImageUrl(props.name) || ""; break;
            case ImageType.Normal: image = buildImageUrl(props.name) || "";
        }
    }
    return <>
        <img
            {...props}
            onError={() => {
                setError(true)
            }} src={image} alt={props.desc || ""} />
    </>
}

export { ImageType, FXImage }