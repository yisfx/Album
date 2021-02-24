"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const urlBuilder_1 = require("../urlBuilder");
const route_config_1 = require("../route.config");
class AdminMaster extends react_1.default.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("nav", { className: "navbar navbar-inverse navbar-fixed-top" },
                react_1.default.createElement("div", { className: "container" },
                    react_1.default.createElement("div", { className: "navbar-header" },
                        react_1.default.createElement("button", { type: "button", className: "navbar-toggle collapsed", "data-toggle": "collapse", "data-target": "#navbar", "aria-expanded": "false", "aria-controls": "navbar" },
                            react_1.default.createElement("span", { className: "sr-only" }, "Toggle navigation"),
                            react_1.default.createElement("span", { className: "icon-bar" }),
                            react_1.default.createElement("span", { className: "icon-bar" }),
                            react_1.default.createElement("span", { className: "icon-bar" })),
                        react_1.default.createElement("a", { className: "navbar-brand", href: urlBuilder_1.urlBuilder(route_config_1.PageNameList.AdminAlbum) }, "FX")),
                    react_1.default.createElement("div", { id: "navbar", className: "collapse navbar-collapse" },
                        react_1.default.createElement("ul", { className: "nav navbar-nav" },
                            react_1.default.createElement("li", { className: "active" },
                                react_1.default.createElement("a", { href: urlBuilder_1.urlBuilder(route_config_1.PageNameList.AdminAlbum) }, "AlbumList")))))),
            react_1.default.createElement("div", { className: "container", style: { marginTop: "50px" } }, this.props.children)));
    }
}
exports.default = AdminMaster;
//# sourceMappingURL=adminMaster.js.map