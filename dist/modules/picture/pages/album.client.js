"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_dom_1 = require("react-dom");
const react_1 = __importDefault(require("react"));
const album_1 = require("../views/album");
let readtData = window["__reactData__"];
react_dom_1.render(react_1.default.createElement(album_1.Album, Object.assign({}, readtData)), document.getElementById("app"));
//# sourceMappingURL=album.client.js.map