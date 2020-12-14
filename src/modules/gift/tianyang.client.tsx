import { render } from "react-dom";
import React from "react";
import { TianyangSnow } from "./tianyang.view";

let readtData = window["__reactData__"]

render(
    <TianyangSnow {...readtData} />,
    document.getElementById("app")
)