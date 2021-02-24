"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumPage = void 0;
const react_dom_1 = require("react-dom");
const react_1 = __importDefault(require("react"));
const albumList_1 = __importDefault(require("../views/albumList"));
class AlbumPage extends react_1.default.Component {
    render() {
        return react_1.default.createElement(albumList_1.default, Object.assign({}, this.props));
    }
}
exports.AlbumPage = AlbumPage;
let readtData = window["__reactData__"];
react_dom_1.render(react_1.default.createElement(AlbumPage, Object.assign({}, readtData)), document.getElementById("app"));
//# sourceMappingURL=album.client.js.map