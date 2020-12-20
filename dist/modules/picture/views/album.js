"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Album = void 0;
const react_1 = __importDefault(require("react"));
class Album extends react_1.default.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (react_1.default.createElement("div", { className: "container" },
            react_1.default.createElement("div", { className: "row" },
                react_1.default.createElement("img", { src: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590736919661&di=358787541391b1009b36d4aef1c50b53&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170316%2F064e3ef4b0054dc7b310bf7cb7023edb_th.jpg", className: "img-responsive", alt: "Image" }),
                react_1.default.createElement("div", { className: "row" },
                    react_1.default.createElement("div", { className: "col-xs-3 col-sm-3 col-md-3 col-lg-3" })))));
    }
}
exports.Album = Album;
//# sourceMappingURL=album.js.map