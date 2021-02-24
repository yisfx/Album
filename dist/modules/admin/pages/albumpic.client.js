"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumPicListPage = void 0;
const react_dom_1 = require("react-dom");
const react_1 = __importDefault(require("react"));
const albumPicList_1 = __importDefault(require("../views/albumPicList"));
class AlbumPicListPage extends react_1.default.Component {
    render() {
        return react_1.default.createElement(albumPicList_1.default, Object.assign({}, this.props));
    }
}
exports.AlbumPicListPage = AlbumPicListPage;
let readtData = window["__reactData__"];
react_dom_1.render(react_1.default.createElement(AlbumPicListPage, Object.assign({}, readtData)), document.getElementById("app"));
//# sourceMappingURL=albumpic.client.js.map