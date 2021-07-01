import React, { useEffect, useState } from "react"
import { BuildAlbumImageUrl, buildImageUrl } from "../imageBuild";



enum ImageType {
    Normal,
    Album,
    MixAlbum,
}

interface IProps extends React.ComponentProps<"img"> {
    name: string,
    type: ImageType,
    desc: string,
    Loaded: (step: "loading" | "preload" | "done" | "error") => void
    LoadStep: "loading" | "preload" | "done" | "error"
}

function FXImage(props: IProps) {

    const buildImageSrc = () => {
        switch (props.type) {
            case ImageType.Album: return BuildAlbumImageUrl(props.name) || "";
            case ImageType.Normal: return buildImageUrl(props.name) || "";
            case ImageType.MixAlbum: return buildImageUrl(props.name, true) || "";
        }
    }

    const buildSrc = () => {
        if (props.LoadStep == "loading" || props.LoadStep == "preload") {
            return "loading.svg";
        }

        if (props.LoadStep == "error") {
            return buildImageUrl("image/error.jpg");
        } else {
            return buildImageSrc();
        }
    }


    let showImage = buildSrc();
    let imageSrc = buildImageSrc();


    return <>
        {props.LoadStep == "preload" &&
            <img
                hidden={true}
                src={imageSrc}
                onLoad={() => {
                    props?.Loaded("done")
                }}
                onError={() => {
                    props?.Loaded("error");
                }}
            />
        }
        <img
            {...props}
            src={showImage} alt={props.desc || ""}
        />
    </>
}

export { ImageType, FXImage }
