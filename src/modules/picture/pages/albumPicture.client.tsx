import { render } from "react-dom";
import React from "react";
import { AlbumPicturePage } from "../views/albumPicture";

let readtData = window["__reactData__"]

render(
    <AlbumPicturePage {...readtData} />,
    document.getElementById("app")
)