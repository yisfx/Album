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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FXImage = exports.ImageType = void 0;
const react_1 = __importStar(require("react"));
const imageBuild_1 = require("../imageBuild");
var ImageType;
(function (ImageType) {
    ImageType[ImageType["Normal"] = 0] = "Normal";
    ImageType[ImageType["Album"] = 1] = "Album";
})(ImageType || (ImageType = {}));
exports.ImageType = ImageType;
function FXImage(props) {
    let image = "";
    const [error, setError] = react_1.useState(false);
    if (error) {
        image = imageBuild_1.buildImageUrl("image/error.jpg");
    }
    else {
        switch (props.type) {
            case ImageType.Album:
                image = imageBuild_1.BuildAlbumImageUrl(props.name) || "";
                break;
            case ImageType.Normal: image = imageBuild_1.buildImageUrl(props.name) || "";
        }
    }
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("img", Object.assign({}, props, { onError: () => {
                setError(true);
            }, src: image, alt: props.desc || "" })));
}
exports.FXImage = FXImage;
//# sourceMappingURL=fxImage.js.map