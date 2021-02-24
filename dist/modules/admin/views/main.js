"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
const react_1 = __importDefault(require("react"));
const urlBuilder_1 = require("../../../framework/urlBuilder");
const route_config_1 = require("../../../framework/route.config");
class Main extends react_1.default.Component {
    constructor(props) {
        super(props);
        window.onload = () => {
            window.location.href = urlBuilder_1.urlBuilder(route_config_1.PageNameList.AdminAlbum);
        };
    }
    render() {
        return (react_1.default.createElement("div", null));
    }
}
exports.Main = Main;
//# sourceMappingURL=main.js.map