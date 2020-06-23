import { render } from "react-dom";
import React from "react";
import { Album } from "../views/album";

let readtData=window["__reactData__"]

render(
    <Album {...readtData} />,
    document.getElementById("app")
)