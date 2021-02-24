"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FxModal = void 0;
const react_1 = __importStar(require("react"));
const react_modal_1 = __importDefault(require("react-modal"));
exports.FxModal = (props) => {
    const [open, setOpen] = react_1.useState(false);
    react_1.useEffect(() => {
        setOpen(props.isOpen);
    }, [props.isOpen]);
    return (react_1.default.createElement(react_modal_1.default, { appElement: document.body, isOpen: open, style: { overlay: { width: "50%", height: "60%", marginLeft: "25%", marginTop: "10%" } } },
        react_1.default.createElement("div", { className: "row" },
            react_1.default.createElement("div", { className: "col-sm-11" }),
            react_1.default.createElement("div", { className: "col-sm-1" },
                react_1.default.createElement("div", { onClick: props === null || props === void 0 ? void 0 : props.close },
                    react_1.default.createElement("i", { className: "glyphicon glyphicon-remove" })))),
        react_1.default.createElement("div", { className: "" }, props.children)));
};
//# sourceMappingURL=modal.js.map