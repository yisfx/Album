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
exports.Upload = void 0;
const react_1 = __importStar(require("react"));
const fast_react_render_1 = __importDefault(require("fast-react-render"));
class IProps {
}
function Upload(props) {
    const [submit, startSubmit] = react_1.useState(0);
    const onSubmit = () => {
        console.log("onSubmit");
    };
    const form = () => {
        return react_1.default.createElement("html", null,
            react_1.default.createElement("body", null,
                react_1.default.createElement("form", { action: props.UploadUrl, onSubmit: onSubmit, method: "post", encType: "multipart/form-data" }, props.children)));
    };
    react_1.useEffect(() => {
        if (submit != 1)
            return;
        let iframe = document === null || document === void 0 ? void 0 : document.getElementsByTagName("iframe")[0];
        setTimeout(() => {
            var _a;
            startSubmit(2);
            let form = (_a = iframe === null || iframe === void 0 ? void 0 : iframe.contentDocument) === null || _a === void 0 ? void 0 : _a.getElementsByTagName("form")[0];
            form.submit();
        }, 3000);
    }, [submit]);
    return react_1.default.createElement("div", null,
        react_1.default.createElement("iframe", { hidden: false, frameBorder: 0, srcDoc: fast_react_render_1.default.elementToString(react_1.default.createElement(form, props), { context: {} }), onLoad: (evt) => {
                var _a, _b, _c;
                if (submit == 2) {
                    let iframe = document === null || document === void 0 ? void 0 : document.getElementsByTagName("iframe")[0];
                    let response = (_c = (_b = (_a = iframe === null || iframe === void 0 ? void 0 : iframe.contentDocument) === null || _a === void 0 ? void 0 : _a.getElementsByTagName("body")[0]) === null || _b === void 0 ? void 0 : _b.getElementsByTagName("pre")[0]) === null || _c === void 0 ? void 0 : _c.innerText;
                    startSubmit(0);
                    try {
                        iframe.srcdoc = fast_react_render_1.default.elementToString(react_1.default.createElement(form, props), { context: {} });
                        (props === null || props === void 0 ? void 0 : props.Success) && props.Success(JSON.parse(response));
                    }
                    catch (_d) {
                        (props === null || props === void 0 ? void 0 : props.Success) && props.Success(response);
                    }
                }
            } }),
        react_1.default.createElement("button", { onClick: () => { startSubmit(1); } }, "submit"));
}
exports.Upload = Upload;
//# sourceMappingURL=upload.js.map