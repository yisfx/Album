import { render } from "react-dom";
import React from "react";
import { AlbumPage } from "../views/album";

let readtData = window["__reactData__"]

render(
    <AlbumPage {...readtData} />,
    document.getElementById("app")
)