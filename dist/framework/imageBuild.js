"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildAlbumImageUrl = exports.buildImageUrl = void 0;
const site_config_1 = __importDefault(require("../conf/site.config"));
function buildImageUrl(name) {
    return `${site_config_1.default.VisualStaticPath}/${name}`;
}
exports.buildImageUrl = buildImageUrl;
function BuildAlbumImageUrl(name) {
    let u = `${site_config_1.default.VisualStaticPath}/album/${name}`;
    console.log(u);
    return u;
}
exports.BuildAlbumImageUrl = BuildAlbumImageUrl;
//# sourceMappingURL=imageBuild.js.map